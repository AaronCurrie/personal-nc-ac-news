import { useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getAllArticles } from '../../utils/api'

import ArticlesDisplay from '../ArticlesDisplay'
import Loading from '../Patterns/Loading'
import Filter from '../Filter'
import Error from '../Patterns/PostError'

const MainPage = ({setCurrTopic}) => {

    const [articles, setArticles] = useState([])
    const [noOfPages, setNoOfPages] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)
    
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
        }).catch(err => {
            setErrorMsg({ status: err.response.status, msg:err.response.data.msg, method:'getting'})
        })
    }, [topic, searchParams])

    if(errorMsg) return <Error errorMsg={errorMsg}/>
    if(isLoading) return<Loading/>
    return (
        <main id='mainPage' className='flex-col articles'>
            <Filter topic={topic} sort={sort_by} order={order} noOfPages={noOfPages} p={p}/>
            <ArticlesDisplay articles={articles}/>         
        </main>
    )
}

export default MainPage