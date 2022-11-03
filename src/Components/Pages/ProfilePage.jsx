import { useContext } from "react"
import { Link } from "react-router-dom"

import { UserContext } from "../Contexts/UserContext"

const ProfilePage = () => {

    const { setUserName, userName } = useContext(UserContext)

    const handleSignOut = () => {
        setUserName(null)
        console.log(userName)
    }

    return (
        <main>
            <h2>Profile Page</h2>
            <p>HELLO</p>
            <Link className="signin" onClick={() => handleSignOut()} to='/'>Sign Out</Link>
        </main>
    )
}

export default ProfilePage