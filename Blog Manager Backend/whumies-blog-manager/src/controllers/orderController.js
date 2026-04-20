import { validateTrackOrderRequest } from "../utils/validators.js";
import { findTrackedOrder } from "../services/orderService.js";

export async function trackOrder(req, res) {
    try {
        const validation = validateTrackOrderRequest(req.body);

        if (!validation.valid) {
            return res.status(validation.status).json({
                success: false,
                message: validation.message
            });
        }

        const order = await findTrackedOrder(validation.data);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No matching order found."
            });
        }

        return res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error("Track order error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch order details right now."
        });
    }
}