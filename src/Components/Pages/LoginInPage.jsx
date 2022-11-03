import { useEffect, useState, useContext } from "react"
import { useSearchParams, Link } from "react-router-dom"

import { getUsers } from "../../utils/api"
import { UserContext } from '../Contexts/UserContext'

import blankuser from '../../Images/blankuser.png'
import Loading from "../Patterns/Loading"
import UserCard from "../UserCard"

const LoginPage = () => {

    const { userName, setUserName } = useContext(UserContext)
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [enteredUsername, setEnteredUserName] = useState('')
    const [isValid, setIsValid] = useState(false)

    const [searchParams] = useSearchParams()
    const {from} = Object.fromEntries([...searchParams])

    useEffect(() => {
        setIsLoading(true)
        getUsers().then(({users}) => {
          setUsers(users)
          setIsLoading(false)
        })
    }, [userName])

    useEffect(() => {
        const valid = users.some(user => user.username === enteredUsername)
        valid? setIsValid(true) : setIsValid(false)
    }, [enteredUsername])

    const handleLogin = () => {
        if(isValid) {
            setUserName(enteredUsername)
        }
    }

    const handleUserChange = event => {
        setEnteredUserName(event.target.value)
	};

    //submit pull request
    //get error handling working on this page
    //can i turn pointer events off for the link
    //style profile page to show your articles and stuff
    //remove votes from my comments
    //add delete to my comments

    if(isLoading) return <Loading/>
    return (
        <main className="profile-page">
            <div className='flex-row login-card'>
                <figure>
                    <img className='avatar' alt='blank user picture' src={blankuser}/> 
                </figure>
                <div className="profile-info flex-col">
                    <h4>LOGIN</h4>
                    <form className="login-form flex-col">
                        <input placeholder="username" type='text' value={enteredUsername} className={isValid? '' : 'error'} onChange={handleUserChange}></input>
                        <input placeholder="password" type='password'></input>
                        <Link  onClick={() => handleLogin()} className={enteredUsername==='' || !isValid? 'hidden' : 'signin'} to={from? `/articles/${from}` : `/user/${userName}`}>Log in</Link>

                    </form>  
                </div>
            </div>  
            <p>try username: jessjelly</p>
            <p>try username: tickle122</p>            
        </main>           
    )
}

export default LoginPage