import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import blankUser from '../Images/blankuser.png'
import MobileMenu from './MobileMenu'


const Header = ({topics, currTopic, userInfo}) => {

    useEffect(() => {

    }, [userInfo])

    return (
        <header className='flex-col'>
            <nav className="flex-row nav-container">
                <Link to='/' className='logo'><h1><span className='highlight'>AC</span>NC <span className='thin'>NEWS</span></h1></Link>
                <div className='flex-row nav-symbols'>
                <Link to={userInfo? `/user/${userInfo.username}` : '/user/login'}><img className='nav-user' src={userInfo? userInfo.avatar_url : blankUser}/></Link>
                <MobileMenu>
                    <Link to='' className={!currTopic? 'active' : ''}>All</Link>
                    {topics.map(element => {
                        return <Link to={`/${element.slug}`} key={element.slug} className={element.slug === currTopic? 'active' : ''}>{element.slug}</Link>
                    })}
                </MobileMenu>
                </div>
            </nav>

        </header>
    )
}

export default Header