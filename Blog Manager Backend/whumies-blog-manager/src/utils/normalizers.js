export function sanitizeText(value) {
    if (typeof value !== "string") return "";
    return value.replace(/[<>"'`;(){}[\]\\]/g, "").trim();
}

export function digitsOnly(value) {
    return value.replace(/\D/g, "");
}

export function normalizeOrderNumber(value) {
    let clean = sanitizeText(value).toLowerCase();
    clean = clean.replace(/^#/, "");
    clean = clean.replace(/^wh/i, "");
    clean = digitsOnly(clean);

    if (!clean) return null;

    return `wh${clean}`;
}

export function normalizePhone(value) {
    let clean = sanitizeText(value);
    clean = digitsOnly(clean);

    if (clean.length === 12 && clean.startsWith("91")) {
        clean = clean.slice(2);
    }

    return clean;
}

export function normalizeEmail(value) {
    const clean = sanitizeText(value).toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(clean)) return null;

    return clean;
}