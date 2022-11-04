import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { UserContext } from "../Contexts/UserContext"
import { getAllArticles, getUserByUserName } from "../../utils/api"
import Loading from "../Patterns/Loading"
import ArticlesDisplay from "../ArticlesDisplay"

const ProfilePage = () => {

    const { setUserName, userName } = useContext(UserContext)

    const [user, setUser] = useState({})
    const [userArticles, setUserArticles] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [newArticleBody, setArticleBody] = useState('')
    const [writeArticle, setWriteArticle] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        window.scrollTo(0, 0)
        getUserByUserName(userName)
        .then(({user}) => {
            setUser(user)     
            return getAllArticles(100, null, 1)
        }).then(({articles}) => {
            setUserArticles(articles.filter(article => article.author === userName))
            setIsLoading(false)
        })
    }, [])

    const handleSignOut = () => {
        setUserName(null)
    }

    const handleChange = (event) => {
        // setNewComment(event.target.value)
        if(event.target.value === '') {
            // setError(true)
        } else {
            // setError(false)
        }
    }
    //still needs work

    const handleClick = () => {
        writeArticle? setWriteArticle(false) : setWriteArticle(true)
        
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
                        <div className="flex-row profile-info">
                            <button onClick={() => handleClick()} className="post-button flex-row"><span className="text-arrows">Write New Article</span> <div className={writeArticle? "up-arrow" : "down-arrow"}>↓</div></button>
                            <Link className="signin" onClick={() => handleSignOut()} to='/'>Sign Out</Link> 
                        </div>

                    </div>   
            </div>
            <form className={writeArticle? 'flex-col new-article-form' : 'hidden'}>
                <h3>Write New Article</h3>
                <textarea onChange={(event) => handleChange(event)} className= 'add-comment' aria-label='add article body' id='newArticleBody' name='newArticleBody' rows='4' cols='50' placeholder="New Article Body..."></textarea>
                <button type='submit' disabled={newArticleBody==='' || !userName} className='load-button'>Post</button>
            </form>
            <div>
                <h3>Your Articles</h3>
                <ArticlesDisplay articles={userArticles}/>
            </div>
            
        </main>
    )
}

export default ProfilePage