import { env } from "../config/env.js";

export function corsMiddleware(req, res, next) {
    if (!env.ALLOWED_ORIGIN) return next();

    const origin = req.headers.origin;

    const allowedOrigins = env.ALLOWED_ORIGIN.split(',');

    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
}