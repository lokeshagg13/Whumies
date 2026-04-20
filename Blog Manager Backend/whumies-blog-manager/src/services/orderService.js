import { ORDER_QUERY } from "../constants/orderQueries.js";
import { shopifyGraphQL } from "./shopifyGraphqlService.js";
import { phonesMatch } from "../utils/validators.js";
import {
    buildAddress,
    extractLineItems,
    extractTrackingDetails,
    pickPaymentMethod
} from "../utils/formatters.js";

export async function findTrackedOrder({
    submittedOrderNumber,
    submittedMobileNumber,
    submittedEmail
}) {
    const searchQuery = `name:${submittedOrderNumber}`;
    const data = await shopifyGraphQL(ORDER_QUERY, { searchQuery });
    const orders = data?.data?.orders?.nodes || [];

    if (orders.length === 0) {
        return null;
    }

    const exactNameMatches = orders.filter(
        (order) => String(order?.name || "").toLowerCase() === submittedOrderNumber.toLowerCase()
    );

    const candidateOrders = exactNameMatches.length > 0 ? exactNameMatches : orders;

    const matchedOrder = candidateOrders.find((order) => {
        const possiblePhones = [
            order?.phone,
            order?.customer?.phone,
            order?.shippingAddress?.phone
        ].filter(Boolean);

        const possibleEmails = [order?.email, order?.customer?.email]
            .filter(Boolean)
            .map((e) => e.toLowerCase());

        const phoneMatch = submittedMobileNumber
            ? possiblePhones.some((phone) => phonesMatch(submittedMobileNumber, phone))
            : false;

        const emailMatch = submittedEmail
            ? possibleEmails.some((e) => e.trim().toLowerCase() === submittedEmail)
            : false;

        return phoneMatch || emailMatch;
    });

    if (!matchedOrder) {
        return null;
    }

    const customerEmail = matchedOrder?.customer?.email || matchedOrder?.email || null;
    const customerPhone =
        matchedOrder?.phone ||
        matchedOrder?.customer?.phone ||
        matchedOrder?.shippingAddress?.phone ||
        null;

    return {
        orderNumber: matchedOrder.name,
        customerEmail,
        customerPhone,
        customerAddress: buildAddress(matchedOrder.shippingAddress),
        paymentMethod: pickPaymentMethod(matchedOrder),
        totalAmount: matchedOrder?.currentTotalPriceSet?.shopMoney
            ? {
                amount: matchedOrder.currentTotalPriceSet.shopMoney.amount,
                currencyCode: matchedOrder.currentTotalPriceSet.shopMoney.currencyCode
            }
            : null,
        products: extractLineItems(matchedOrder),
        tracking: extractTrackingDetails(matchedOrder),
        fulfillmentStatus: matchedOrder?.displayFulfillmentStatus || null,
        financialStatus: matchedOrder?.displayFinancialStatus || null
    };
}