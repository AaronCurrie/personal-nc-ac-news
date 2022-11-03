import { useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getAllArticles } from '../../utils/api'

import ArticlesDisplay from '../ArticlesDisplay'
import PageNav from '../PageNav'
import Loading from '../Patterns/Loading'
import Hero from '../Hero/Hero';

const MainPage = ({setCurrTopic}) => {

    const [articles, setArticles] = useState([])
    const [noOfPages, setNoOfPages] = useState(0)
    const [isLoading, setLoading] = useState(true)
    
    const {topic} = useParams()

    const [searchParams] = useSearchParams()
    const {limit, p} = Object.fromEntries([...searchParams])

    useEffect(() => {
        setLoading(true)
        setCurrTopic(topic)
        getAllArticles(limit, topic==='all'? '' : topic , p)
        .then((data) => {
            setArticles(data.articles)
            setNoOfPages(data.NumberOfPages)
            setLoading(false)
        })
    }, [topic, searchParams])

    if(isLoading) return<Loading/>
    return (
        <main id='mainPage' className='flex-col articles'>
            <ArticlesDisplay articles={articles}/>
            <PageNav topic={topic} p={p} noOfPages={noOfPages}/>
        </main>
    )
}

export default MainPage