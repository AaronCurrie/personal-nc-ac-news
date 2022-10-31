import { Link } from 'react-router-dom'

const TopicsNav = ({searchObj, topics}) => {
    
    return (      
        <nav>
            <Link to='/all' className={searchObj.topic === '' ||  searchObj.topic === undefined? 'active' : ''}>All</Link>
            {console.log(searchObj.topic)}
            {topics.map(topic => {
                return <Link to={`/${topic.slug}`} key={topic.slug} className={topic.slug === searchObj.topic? 'active' : ''}>{topic.slug}</Link>
            })}
        </nav>
    )
}

export default TopicsNav