import { env } from "../config/env.js";
import { getAccessToken } from "./shopifyAuthService.js";

export async function shopifyGraphQL(query, variables = {}) {
    const token = await getAccessToken();

    const response = await fetch(
        `https://${env.SHOP}.myshopify.com/admin/api/${env.SHOPIFY_API_VERSION}/graphql.json`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Shopify-Access-Token": token
            },
            body: JSON.stringify({ query, variables })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`GraphQL failed (${response.status}): ${JSON.stringify(data)}`);
    }

    if (data.errors?.length) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data;
}