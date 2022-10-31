import { useEffect } from "react"
import { useState } from "react"

import { getAllArticles } from "../utils/api"

import ArticleCard from "./ArticleCard"


const ArticlesDisplay = () => {

    const [articles, setArticles] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getAllArticles().then((data) => {
            setArticles(data)
            setLoading(false)
        })
    }, [])

    if(isLoading) return <h2>Loading</h2>
    return (
        <section >
            <ul className="flex-row display">
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} article={article}/>
                })}
            </ul>
        </section>
    )
}

export default ArticlesDisplay