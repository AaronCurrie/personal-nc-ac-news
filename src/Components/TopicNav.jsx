import { useEffect, useState } from "react"
import { getAllTopics } from "../utils/api"
import { Link } from 'react-router-dom'

const TopicsNav = ({setSearchObj, searchObj}) => {

    const [topics, setTopics] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [currentTopic, setCurrentTopic] = useState('')

    useEffect(() => {
        setLoading(true)
        getAllTopics().then((data) => {
            setTopics(data.topics)
            setLoading(false)
        })
    }, [])

    function handleCategory(topic) {
        setCurrentTopic(topic)
    }

    if(isLoading) return <h2>Loading</h2>
    return (
        <nav>
            <Link to='/all' onClick={() => {handleCategory('')}} className={currentTopic === ''? 'active' : ''}>All</Link>
            {topics.map(topic => {
                return <Link to={`/${topic.slug}`} onClick={() => {handleCategory(topic.slug)}} key={topic.slug} className={topic.slug === currentTopic? 'active' : ''}>{topic.slug}</Link>
            })}
        </nav>
    )
}

export default TopicsNav