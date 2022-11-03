import { useEffect, useState, useContext } from "react"
import { useSearchParams } from "react-router-dom"

import { getUsers } from "../../utils/api"
import { UserContext } from '../Contexts/UserContext'

import Loading from "../Patterns/Loading"
import UserCard from "../UserCard"

const LoginPage = () => {

    const { userName } = useContext(UserContext)
    const [users, setUsers] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const [searchParams] = useSearchParams()
    const {from} = Object.fromEntries([...searchParams])

    useEffect(() => {
        setIsLoading(true)
        getUsers().then(({users}) => {
          setUsers(users)
          setIsLoading(false)
        })
    }, [userName])

    //needs more styling
    //fix carosel on smaller screens

    if(isLoading) return <Loading/>
    return (
        <main className="login-page flex-col">
            <h3>Login</h3>
            <ul className="flex-row carosel">
                {users.map(user => {
                    return <UserCard key={user.username} from={from} user={user}/>
                })}
            </ul>

        </main>
    )
}

export default LoginPage