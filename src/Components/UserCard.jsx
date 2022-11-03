import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './Contexts/UserContext'

const UserCard = ({user, from}) => {

    const { setUserName, userName } = useContext(UserContext)
    const [isClicked, setIsClick] = useState(false)

    const handleClick = () => {
        if(!isClicked) {
            setIsClick(true) 
        } else {
            setIsClick(false)  
        }
    }

    const handleLogin = () => {
        setUserName(user.username)
    }

    return (
        <li onClick={handleClick} className='flex-col user-card'>
                <figure>
                    <img className='avatar' alt='user avatar' src={user.avatar_url}/> 
                </figure>
                <h4>{user.name}</h4>
                {isClicked?<Link onClick={() => handleLogin()} className='signin' to={from? `/articles/${from}` : `/user/${userName}`}>Log in</Link> : <></>}
        </li>
    )
}

export default UserCard