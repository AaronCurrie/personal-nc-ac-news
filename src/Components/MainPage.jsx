import ArticlesDisplay from './ArticlesDisplay'
import PageNav from './PageNav'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getAllArticles } from '../utils/api'

const MainPage = ({setCurrTopic}) => {

    const [articles, setArticles] = useState([])
    const [noOfPages, setNoOfPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [isLoading, setLoading] = useState(true)

    const { topic } = useParams()
    const { pageNo } = useParams()

    useEffect(() => {
        setLoading(true)
        setCurrTopic(topic)
        getAllArticles(limit, topic, pageNo)
        .then((data) => {
            setArticles(data.articles)
            setNoOfPages(data.NumberOfPages)
            setLoading(false)
        })
    }, [limit, topic, pageNo])

    if(isLoading) return<h2>Loading</h2>
    return (
        <main className='flex-col'>
            <ArticlesDisplay articles={articles}/>
            <PageNav topic={topic} pageNo={pageNo} noOfPages={noOfPages}/>
        </main>
    )
}

export default MainPage