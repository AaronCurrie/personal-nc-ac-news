import { useEffect, useState, useContext } from "react"
import { useSearchParams, Link } from "react-router-dom"

import { getUsers } from "../../utils/api"
import { UserContext } from '../Contexts/UserContext'

import blankuser from '../../Images/blankuser.png'
import Loading from "../Patterns/Loading"
import Error from '../Patterns/PostError'

const LoginPage = () => {

    const { userName, setUserName } = useContext(UserContext)
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [enteredUsername, setEnteredUserName] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [isValidUser, setIsValidUser] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null)

    const [searchParams] = useSearchParams()
    const {from} = Object.fromEntries([...searchParams])

    useEffect(() => {
        setIsLoading(true)
        getUsers().then(({users}) => {
          setUsers(users)
          setIsLoading(false)
        })
        .catch(err => {
            setErrorMsg({ status: err.response.status, msg:err.response.data.msg, method:'getting'})
        })
    }, [userName])

    useEffect(() => {
        const validUser = users.some(user => user.username === enteredUsername)
        const validPassword = enteredPassword.length > 0
        validUser? setIsValidUser(true) : setIsValidUser(false)
        validPassword? setIsValidPassword(true) : setIsValidPassword(false)
    }, [enteredUsername, enteredPassword])

    const handleLogin = () => {
        if(isValidUser) {
            setUserName(enteredUsername)
        }
    }

    const handleUserChange = event => {
        setEnteredUserName(event.target.value)
	};

    const handlePasswordChange = event => {
        setEnteredPassword(event.target.value)
    }


    if(errorMsg) return <Error errorMsg={errorMsg}/>
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
                        
                        <input placeholder="username" type='text' value={enteredUsername} className={isValidUser? 'valid' : 'error'} onChange={handleUserChange}></input>
                        <input placeholder="password" type='password' className={isValidPassword && isValidUser? 'valid' : 'error'} onChange={handlePasswordChange}></input>
                        <p className={!isValidUser || !isValidPassword? 'invalid' : 'hidden'}>Invalid username or password</p>
                        <Link  onClick={() => handleLogin()} className={!isValidPassword || !isValidUser? 'signin-invalid' : 'signin'} to={from? `/articles/${from}` : `/user/${userName}`}>Log in</Link>
                    </form>  
                </div>
            </div>  
            <p>try username: jessjelly password: password</p>
            <p>try username: tickle122 password: 123</p>            
        </main>           
    )
}

export default LoginPage