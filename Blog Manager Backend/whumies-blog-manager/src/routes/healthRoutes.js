import { Router } from "express";
import { getAccessToken } from "../services/shopifyAuthService.js";
import { shopifyGraphQL } from "../services/shopifyGraphqlService.js";

const router = Router();

router.get("/health", (req, res) => {
    res.json({ ok: true });
});

router.get("/test-token", async (req, res) => {
    try {
        const token = await getAccessToken();

        res.json({
            success: true,
            tokenPreview: `${token.slice(0, 8)}...`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.get("/test-shopify", async (req, res) => {
    try {
        const result = await shopifyGraphQL(`
      query {
        shop {
          name
          myshopifyDomain
        }
      }
    `);

        res.json({
            success: true,
            data: result.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;