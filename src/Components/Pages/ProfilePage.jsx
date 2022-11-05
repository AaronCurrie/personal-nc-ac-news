import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { UserContext } from "../Contexts/UserContext"
import { getAllArticles, getUserByUserName } from "../../utils/api"
import Loading from "../Patterns/Loading"
import ArticlesDisplay from "../ArticlesDisplay"
import Error from '../Patterns/PostError'
import NewArticle from "./NewArticle"

const ProfilePage = () => {

    const { setUserName, userName } = useContext(UserContext)

    const [user, setUser] = useState({})
    const [userArticles, setUserArticles] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [writeArticle, setWriteArticle] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [postedNew, setPostedNew] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        window.scrollTo(0, 0)
        setPostedNew(false)
        setWriteArticle(false)
        getUserByUserName(userName)
        .then(({user}) => {
            setUser(user)     
            return getAllArticles(100, null, 1)
        }).then(({articles}) => {
            setUserArticles(articles.filter(article => article.author === userName))
            setIsLoading(false)
        }).catch(err => {
            setErrorMsg({ status: err.response.status, msg:err.response.data.msg, method:'getting'})
            setIsLoading(false)
        })
    }, [postedNew])

    const handleSignOut = () => {
        setUserName(null)
    }

    const handleClick = () => {
        writeArticle? setWriteArticle(false) : setWriteArticle(true)
    }

    if(errorMsg) return <Error errorMsg={errorMsg}/>
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
                        <div className="flex-row profile-info">
                            <button onClick={() => handleClick()} className="post-button flex-row"><span className="text-arrows">Write New Article</span> <div className={writeArticle? "up-arrow" : "down-arrow"}>↓</div></button>
                            <Link className="signin" onClick={() => handleSignOut()} to='/'>Sign Out</Link> 
                        </div>
                    </div>   
            </div>
            <NewArticle setPostedNew={setPostedNew} userName={userName} writeArticle={writeArticle}/>
            <div>
                <h3>Your Articles</h3>
                <ArticlesDisplay articles={userArticles}/>
            </div>
            
        </main>
    )
}

export default ProfilePage