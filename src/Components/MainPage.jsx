import ArticlesDisplay from './ArticlesDisplay'
import TopicsNav from './TopicNav'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getAllArticles, getAllTopics } from '../utils/api'


const MainPage = () => {

    const [searchObj, setSearchObj] = useState({topic:''})

    const [articles, setArticles] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [totalArticles, setTotlaArticles] = useState(0)
    const [topics, setTopics] = useState([])

    const {topic} = useParams()

    useEffect(() => {
        if(topic === 'all') {
            setSearchObj((currentObj) => {
                return {...currentObj, topic:''}
            })
        } else {
            setSearchObj((currentObj) => {
                return {...currentObj, topic: topic}
            }) 
        }
    }, [topic])

    useEffect(() => {
        setLoading(true)
        Promise.all([getAllArticles(searchObj), getAllTopics()])
        .then((data) => {
            setTopics(data[1].topics)
            setArticles(data[0].articles)
            setTotlaArticles(data[0].total_count)
            setLoading(false)
        })
    }, [searchObj])

    if(isLoading) return<h2>Loading</h2>
    else
    return (
        <main className='flex-col'>
            <TopicsNav topics={ topics } searchObj = {searchObj}/> 
            <ArticlesDisplay totalArticles={totalArticles} articles={articles} setSearchObj={setSearchObj} searchObj = {searchObj}/>
        </main>
    )
}

export default MainPage