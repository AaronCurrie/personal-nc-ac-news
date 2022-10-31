import { Link } from 'react-router-dom'

const Header = ({topics, currTopic}) => {

    return (
        <header className='flex-col'>
            <nav className="flex-row">
                <Link to='/'><h1>ACNC NEWS</h1></Link>
            </nav>
            <nav>
            <Link to='/' className={!currTopic? 'active' : ''}>All</Link>
                {topics.map(element => {
                    return <Link to={`/${element.slug}/1`} key={element.slug} className={element.slug === currTopic? 'active' : ''}>{element.slug}</Link>
                })}
            </nav>
        </header>
    )
}

export default Header