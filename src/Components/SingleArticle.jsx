import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getArticleById, getUserByUserName } from '../utils/api'
import { formatDate } from '../utils/utils'
import { imageSelctor } from '../utils/images';

import Loading from './Loading'
import Voter from './Voter'
import CommentsSection from './CommentsSection'

const SingleArticle = ({setCurrTopic}) => {

    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [article, setArticle] = useState({})
    const [author, setAuthor] = useState({})
    const [img, setImg] = useState()

    useEffect(() => {
        setIsLoading(true)
        setCurrTopic('none')
        window.scrollTo(0, 0)
        getArticleById(article_id)
        .then(({article}) => {
            setArticle(article)
            return getUserByUserName(article.author)
        }).then(({user}) => {
            setAuthor(user)     
            setIsLoading(false)
        })
    }, [article_id])
    
    if(isLoading) return <Loading/>
    return (
        <main>
            <div className='img-container'>
                <img className='main-img' src={imageSelctor(article.topic, article.article_id)}/>
                <div className='title-container flex-col'>
                    <h2>{article.title}</h2>
                    <div className='flex-row card-info'>
                        <Voter id={article.article_id} votes={article.votes}/>
                        <p>{article.topic}</p>
                        <a  href='#article'>Read More</a>
                    </div>
                </div>
            </div>
            <article id='article' className='flex-col single-article'>
                <p >{article.body}</p>
                <div className='flex-col aside-container'>   
                    <aside className='flex-col author'>
                        <h3>Author</h3>
                        <div className='flex-row author-card'>
                            <figure>
                                <img className='avatar' src={author.avatar_url}/> 
                            </figure>
                            <div className='card-info flex-row'>
                                <h4>{author.name}</h4>
                                <p>{formatDate(article.created_at)}</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>
            <CommentsSection id={article.article_id}/>
        </main>
    )
}

export default SingleArticle