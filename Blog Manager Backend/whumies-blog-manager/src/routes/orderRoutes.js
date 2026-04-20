import { Router } from "express";
import { trackOrder } from "../controllers/orderController.js";

const router = Router();

router.post("/api/track-order", trackOrder);

export default router;