import {
    normalizeEmail,
    normalizeOrderNumber,
    normalizePhone
} from "./normalizers.js";

export function validateTrackOrderRequest(body) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return { valid: false, status: 400, message: "Invalid request format." };
    }

    const allowedKeys = ["orderNumber", "mobileNumber", "email"];
    const bodyKeys = Object.keys(body);

    if (!bodyKeys.every((key) => allowedKeys.includes(key))) {
        return { valid: false, status: 400, message: "Invalid request format." };
    }

    const submittedOrderNumber = normalizeOrderNumber((body.orderNumber || "").toString());
    const submittedMobileNumber = normalizePhone((body.mobileNumber || "").toString());
    const submittedEmail = normalizeEmail((body.email || "").toString());

    if (!submittedOrderNumber) {
        return { valid: false, status: 400, message: "Invalid order number." };
    }

    if (!/^wh\d{3,10}$/.test(submittedOrderNumber)) {
        return { valid: false, status: 400, message: "Invalid order format." };
    }

    const hasValidPhone = !!(
        submittedMobileNumber &&
        submittedMobileNumber.length >= 10 &&
        submittedMobileNumber.length <= 15
    );

    const hasValidEmail = !!submittedEmail;

    if (!hasValidPhone && !hasValidEmail) {
        return {
            valid: false,
            status: 400,
            message: "Provide a valid mobile number or email."
        };
    }

    return {
        valid: true,
        data: {
            submittedOrderNumber,
            submittedMobileNumber,
            submittedEmail
        }
    };
}

export function phonesMatch(submittedPhone, orderPhone) {
    const a = normalizePhone(submittedPhone);
    const b = normalizePhone(orderPhone);

    if (!a || !b) return false;
    if (a === b) return true;

    if (a.length >= 10 && b.length >= 10) {
        return a.slice(-10) === b.slice(-10);
    }

    return false;
}