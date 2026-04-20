import { validateWriteArticleRequest } from "../utils/validators.js";
import { writeArticleToBlog } from "../services/blogService.js";

export async function writeArticle(req, res) {
    try {
        const validation = validateWriteArticleRequest(req.body);

        if (!validation.valid) {
            return res.status(validation.status).json({
                success: false,
                message: validation.message
            });
        }

        const blogId = env.BLOG_ID;
        const writeArticleStatus = await writeArticleToBlog({ blogId, ...validation.data });

        if (!writeArticleStatus.success) {
            return res.status(400).json({
                success: false,
                message: `Unable to add your article to the blog due to the following error: ${writeArticleStatus.errors}`,
            });
        }

        res.json({
            success: true,
            article: writeArticleStatus.article,
        });
    } catch (err) {
        console.error("Write article error:", error);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}