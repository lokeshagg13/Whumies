import { WRITE_ARTICLE_QUERY } from "../constants/blogQueries.js";
import { shopifyGraphQL } from "./shopifyGraphqlService.js";

export async function writeArticleToBlog({
    blogId,
    title,
    contentHtml,
    tags = [],
}) {
    const articleData = {
        article: {
            title,
            body: contentHtml,
            tags,
        },
        blog: {
            id: blogId,
        },
    };
    const data = await shopifyGraphQL(WRITE_ARTICLE_QUERY, articleData);
    if (data.articleCreate.userErrors.length > 0) {
        return {
            success: false,
            errors: data.articleCreate.userErrors,
        };
    }

    return {
        success: true,
        article: data.articleCreate.article,
    };
}