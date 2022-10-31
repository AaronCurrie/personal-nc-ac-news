import { useEffect, useState } from "react"
import { getAllTopics } from "../utils/api"

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
        setSearchObj((currentObj) => {
            return {...currentObj, topic: topic}
        })
        setCurrentTopic(topic)
    }

    if(isLoading) return <h2>Loading</h2>
    return (
        <nav>
            {topics.map(topic => {
                return <button onClick={() => {handleCategory(topic.slug)}} key={topic.slug} className={topic.slug === currentTopic? 'active' : ''}>{topic.slug}</button>
            })}
        </nav>
    )
}

export default TopicsNav