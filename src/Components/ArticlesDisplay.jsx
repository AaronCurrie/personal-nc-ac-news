import ArticleCard from "./ArticleCard"


const ArticlesDisplay = ({articles}) => {

    return (
        <section>
            <ul className="flex-row display">
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </ul>
        </section>
    )
}

export default ArticlesDisplay