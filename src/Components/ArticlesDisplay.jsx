import { useEffect } from "react"
import { useState } from "react"

import { getAllArticles } from "../utils/api"

import ArticleCard from "./ArticleCard"


const ArticlesDisplay = ({searchObj, setSearchObj}) => {

    const [articles, setArticles] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [totalArticles, setTotlaArticles] = useState(0)

    useEffect(() => {
        setLoading(true)
        getAllArticles(searchObj).then((data) => {
            setArticles(data.articles)
            setTotlaArticles(data.total_count)
            setLoading(false)
        })
    }, [searchObj])

    const handleLoadAll = () => {
        setSearchObj((currentObj) => {
            return {...currentObj, limit: totalArticles}
        })
    }

    if(isLoading) return <h2>Loading</h2>
    return (
        <section>
            <ul className="flex-row display">
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </ul>
            <button onClick = {() => handleLoadAll()}>Load All</button>
        </section>

    )
}

export default ArticlesDisplay