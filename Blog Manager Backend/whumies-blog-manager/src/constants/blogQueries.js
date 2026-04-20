export const WRITE_ARTICLE_QUERY = `
    mutation CreateArticle($article: ArticleCreateInput!, $blog: ArticleBlogInput) {
        articleCreate(article: $article, blog: $blog) {
            article {
            id
            title
            handle
            publishedAt
            }
            userErrors {
            field
            message
            }
        }
    }
`;