import { useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getAllArticles } from '../../utils/api'

import ArticlesDisplay from '../ArticlesDisplay'
import PageNav from '../PageNav'
import Loading from '../Patterns/Loading'
import Filter from '../Filter'

const MainPage = ({setCurrTopic}) => {

    const [articles, setArticles] = useState([])
    const [noOfPages, setNoOfPages] = useState(0)
    const [isLoading, setLoading] = useState(true)
    
    const {topic} = useParams()

    const [searchParams] = useSearchParams()
    const {limit, p, sort_by, order} = Object.fromEntries([...searchParams])

    useEffect(() => {
        setLoading(true)
        window.scrollTo(0, 0)
        setCurrTopic(topic==='all'? null : topic)
        getAllArticles(limit, topic==='all'? null : topic , p, sort_by, order)
        .then((data) => {
            setArticles(data.articles)
            setNoOfPages(data.NumberOfPages)
            setLoading(false)
        })
    }, [topic, searchParams])

    if(isLoading) return<Loading/>
    return (
        <main id='mainPage' className='flex-col articles'>
            <Filter topic={topic} sort={sort_by} order={order} noOfPages={noOfPages} p={p}/>
            {/* <PageNav topic={topic} p={p} sort={sort_by} order={order} noOfPages={noOfPages}/> */}
            <ArticlesDisplay articles={articles}/>         
        </main>
    )
}

export default MainPage