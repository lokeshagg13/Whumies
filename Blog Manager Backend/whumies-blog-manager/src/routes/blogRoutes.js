import { Router } from "express";
import { writeArticle } from "../controllers/blogController.js";

const router = Router();

router.post("/api/write-article", writeArticle);
// router.post("/api/articles",);

export default router;