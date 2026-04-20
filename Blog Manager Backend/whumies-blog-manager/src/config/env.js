import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT || 3000),
    SHOP: process.env.SHOPIFY_SHOP,
    CLIENT_ID: process.env.SHOPIFY_CLIENT_ID,
    CLIENT_SECRET: process.env.SHOPIFY_CLIENT_SECRET,
    SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION || "2026-04",
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || ""
};

if (!env.SHOP || !env.CLIENT_ID || !env.CLIENT_SECRET) {
    throw new Error(
        "Missing required env vars: SHOPIFY_SHOP, SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET"
    );
}