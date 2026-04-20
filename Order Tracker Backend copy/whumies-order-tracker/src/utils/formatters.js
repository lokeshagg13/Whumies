export function buildAddress(address) {
    if (!address) return null;

    return {
        name: [address.firstName, address.lastName].filter(Boolean).join(" ").trim() || null,
        address1: address.address1 || null,
        address2: address.address2 || null,
        city: address.city || null,
        province: address.province || null,
        zip: address.zip || null,
        country: address.country || null,
        phone: address.phone || null,
        formatted: Array.isArray(address.formatted) ? address.formatted : []
    };
}

export function pickPaymentMethod(order) {
    const transactions = order?.transactions || [];

    const successful = transactions.find(
        (t) =>
            String(t.status || "").toUpperCase() === "SUCCESS" &&
            ["SALE", "CAPTURE", "AUTHORIZATION"].includes(String(t.kind || "").toUpperCase())
    );

    if (successful?.formattedGateway) return successful.formattedGateway;
    if (successful?.gateway) return successful.gateway;

    const anyTx = transactions.find((t) => t?.formattedGateway || t?.gateway);
    if (anyTx?.formattedGateway) return anyTx.formattedGateway;
    if (anyTx?.gateway) return anyTx.gateway;

    if (Array.isArray(order?.paymentGatewayNames) && order.paymentGatewayNames.length > 0) {
        return order.paymentGatewayNames.join(", ");
    }

    return order?.displayFinancialStatus || "Unavailable";
}

export function extractTrackingDetails(order) {
    const fulfillments = order?.fulfillments || [];
    const tracking = [];

    for (const fulfillment of fulfillments) {
        const info = fulfillment?.trackingInfo || [];
        for (const item of info) {
            tracking.push({
                company: item?.company || null,
                trackingNumber: item?.number || null,
                trackingUrl: item?.url || null
            });
        }
    }

    return tracking;
}

export function extractLineItems(order) {
    const items = order?.lineItems?.nodes || [];

    return items.map((item) => ({
        name: item?.title || "",
        variant: item?.variantTitle || null,
        sku: item?.sku || null,
        quantity: item?.quantity || 0,
        unitPrice: item?.originalUnitPriceSet?.shopMoney
            ? {
                amount: item.originalUnitPriceSet.shopMoney.amount,
                currencyCode: item.originalUnitPriceSet.shopMoney.currencyCode
            }
            : null,
        lineTotal: item?.originalTotalSet?.shopMoney
            ? {
                amount: item.originalTotalSet.shopMoney.amount,
                currencyCode: item.originalTotalSet.shopMoney.currencyCode
            }
            : null
    }));
}