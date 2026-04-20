import express from "express";
import helmet from "helmet";
import healthRoutes from "./routes/healthRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { requestLogger } from "./middlewares/logger.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

const app = express();

app.disable("x-powered-by");

app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

app.use(express.json({ limit: "20kb" }));
app.use(requestLogger);
app.use(corsMiddleware);

app.use("/api", apiLimiter);

app.use(healthRoutes);
app.use(orderRoutes);

export default app;