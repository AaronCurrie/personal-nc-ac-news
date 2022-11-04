import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getArticleById} from '../../utils/api'
import { imageSelctor } from '../../utils/images';

import Loading from '../Patterns/Loading'
import ArticleVoter from '../ArticleVoter'
import CommentsSection from '../CommentsSection'
import Author from '../Author'
import Error from '../Patterns/PostError'

const SingleArticle = ({setCurrTopic}) => {

    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [article, setArticle] = useState({})
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        setCurrTopic('none')
        window.scrollTo(0, 0)

        getArticleById(article_id)
        .then(({article}) => {
            setArticle(article)
            setIsLoading(false)
        }).catch(err => {
            setErrorMsg({ status: err.response.status, msg:err.response.data.msg, method:'getting'})
        })
    }, [article_id])
    
    if(errorMsg) return <Error errorMsg={errorMsg}/>
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
                <div className='flex-col aside-container'>   
                    <Author articleAuthor={article.author} created_at={article.created_at}/>
                </div>
            </article>
            <CommentsSection id={article.article_id}/>
        </main>
    )
}

export default SingleArticle