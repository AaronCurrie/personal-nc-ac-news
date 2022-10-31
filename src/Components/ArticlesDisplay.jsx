import ArticleCard from "./ArticleCard"


const ArticlesDisplay = ({setSearchObj, totalArticles, articles}) => {

    const handleLoadAll = (state) => {
        if(state === 'more') {
            setSearchObj((currentObj) => {
                return {...currentObj, limit: totalArticles}
            }) 
        } else {
            setSearchObj((currentObj) => {
                return {...currentObj, limit: 10}
            }) 
        }
    }

    return (
        <section>
            <ul className="flex-row display">
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </ul>
            <button className={articles.length < totalArticles? '' : 'hidden'} onClick = {() => handleLoadAll('more')}>Load More</button>
            <button className={articles.length === totalArticles? '' : 'hidden'} onClick = {() => handleLoadAll('less')}>Load Less</button>
        </section>
    )
}

export default ArticlesDisplay