import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { UserContext } from "../Contexts/UserContext"
import { getUserByUserName } from "../../utils/api"
import Loading from "../Patterns/Loading"

const ProfilePage = () => {

    const { setUserName, userName } = useContext(UserContext)

    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getUserByUserName(userName)
        .then(({user}) => {
            setUser(user)     
            setIsLoading(false)
        })
    }, [])

    const handleSignOut = () => {
        setUserName(null)
    }

    if(isLoading) return <Loading/>
    return (
        <main className="profile-page">
            <div className='flex-row profile-card'>
                    <figure>
                        <img className='avatar' alt='user avatar' src={user.avatar_url}/> 
                    </figure>
                    <div className="profile-info flex-col">
                        <h4>{user.name}</h4>
                        <p>{user.username}</p>
                        <Link className="load-button" onClick={() => handleSignOut()} to='/'>Post Article</Link>
                        <Link className="signin" onClick={() => handleSignOut()} to='/'>Sign Out</Link>
                    </div>
 
            </div>
            
        </main>
    )
}

export default ProfilePage