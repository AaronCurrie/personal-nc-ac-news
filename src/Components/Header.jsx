import { Link } from 'react-router-dom'

const Header = ({topics, currTopic}) => {
    return (
        <header className='flex-col'>
            <nav className="flex-row">
                <Link to='/'><h1>ACNC NEWS</h1></Link>
            </nav>
            <nav>
            <Link to='/' className={currTopic === '' ||  currTopic === undefined? 'active' : ''}>All</Link>
                {topics.map(topic => {
                    return <Link to={`/${topic.slug}`} key={topic.slug} className={topic.slug === currTopic? 'active' : ''}>{topic.slug}</Link>
                })}
            </nav>
        </header>
    )
}

export default Header