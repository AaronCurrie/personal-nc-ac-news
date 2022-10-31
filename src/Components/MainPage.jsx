import ArticlesDisplay from './ArticlesDisplay'
import PageNav from './PageNav'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getAllArticles } from '../utils/api'

const MainPage = ({setCurrTopic}) => {

    const [articles, setArticles] = useState([])
    const [pages, setPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [isLoading, setLoading] = useState(true)

    const { topic } = useParams()

    useEffect(() => {
        setLoading(true)
        setCurrTopic(topic)
        getAllArticles(limit, topic)
        .then((data) => {
            console.log(data)
            setArticles(data.articles)
            setPages(data.NumberOfPages)
            setLoading(false)
        })
    }, [limit, topic])

    if(isLoading) return<h2>Loading</h2>
    return (
        <main className='flex-col'>
            <ArticlesDisplay articles={articles}/>
            <PageNav pages={pages}/>
        </main>
    )
}

export default MainPage