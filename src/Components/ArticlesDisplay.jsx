import { useEffect } from "react"
import { useState } from "react"
import { useParams } from 'react-router-dom'
import { getAllArticles } from "../utils/api"

import ArticleCard from "./ArticleCard"


const ArticlesDisplay = ({searchObj, setSearchObj}) => {

    const [articles, setArticles] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [totalArticles, setTotlaArticles] = useState(0)

    const {topic} = useParams()

    useEffect(() => {
        if(topic === 'all') {
            setSearchObj((currentObj) => {
                return {...currentObj, topic: ''}
            })
        } else {
            setSearchObj((currentObj) => {
                return {...currentObj, topic: topic}
            }) 
        }

    }, [topic])

    useEffect(() => {
        setLoading(true)
        getAllArticles(searchObj).then((data) => {
            setArticles(data.articles)
            setTotlaArticles(data.total_count)
            setLoading(false)
        })
    }, [searchObj])

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

    if(isLoading) return <h2>Loading</h2>
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