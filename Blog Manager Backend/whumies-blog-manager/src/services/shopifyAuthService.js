import { URLSearchParams } from "node:url";
import { env } from "../config/env.js";

let accessToken = null;
let tokenExpiresAt = 0;

export async function getAccessToken() {
    if (accessToken && Date.now() < tokenExpiresAt - 60_000) {
        return accessToken;
    }

    const response = await fetch(
        `https://${env.SHOP}.myshopify.com/admin/oauth/access_token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json"
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: env.CLIENT_ID,
                client_secret: env.CLIENT_SECRET
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Token request failed (${response.status}): ${JSON.stringify(data)}`);
    }

    if (!data.access_token) {
        throw new Error(`No access token returned: ${JSON.stringify(data)}`);
    }

    accessToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in || 0) * 1000;

    return accessToken;
}