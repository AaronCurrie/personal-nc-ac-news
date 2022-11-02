import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById, getUserByUserName } from '../utils/api'
import { formatDate } from '../utils/utils'
import { imageSelctor } from '../utils/images';

import Loading from './Loading'
import ArticleVoter from './ArticleVoter'
import CommentsSection from './CommentsSection'

const SingleArticle = ({setCurrTopic}) => {

    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [article, setArticle] = useState({})
    const [author, setAuthor] = useState({})

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
                <img className='main-img' alt={`${article.topic}`} src={imageSelctor(article.topic, article.article_id)}/>
                <div className='title-container flex-col'>
                    <h2>{article.title}</h2>
                    <div className='flex-row card-info'>
                        <ArticleVoter id={article.article_id} votes={article.votes}/>
                        <p><i>{article.topic}</i></p>
                    </div>
                </div>
            </div>
            <article  className='flex-col single-article'>
                <p >{article.body}</p>
                {
                //maybe make a author component to tidy up
                }
                <div className='flex-col aside-container'>   
                    <aside className='flex-col author'>
                        <div className='flex-row author-card'>
                            <figure>
                                <img className='avatar' alt='author avatar' src={author.avatar_url}/> 
                            </figure>
                            <div className='card-info-left flex-col'>
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