import { Link } from 'react-router-dom'

import MobileMenu from './MobileMenu'

const Header = ({topics, currTopic}) => {

    return (
        <header className='flex-col'>
            <nav className="flex-row nav-container">
                <Link to='/' className='logo'><h1><span className='highlight'>AC</span>NC <span className='thin'>NEWS</span></h1></Link>
                <MobileMenu>
                    <Link to='' className={!currTopic? 'active' : ''}>All</Link>
                    {topics.map(element => {
                        return <Link to={`/${element.slug}`} key={element.slug} className={element.slug === currTopic? 'active' : ''}>{element.slug}</Link>
                    })}
                </MobileMenu>
            </nav>

        </header>
    )
}

export default Header