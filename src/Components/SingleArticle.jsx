import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById, getUserByUserName } from '../utils/api'
import { formatDate } from '../utils/utils'

import { imageSelctor } from '../utils/utils'

import Loading from './Loading'
import Voter from './Voter'

const SingleArticle = ({setCurrTopic}) => {
 
    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [article, setArticle] = useState({})
    const [author, setAuthor] = useState({})

    useEffect(() => {
        setIsLoading(true)
        setCurrTopic('none')
        getArticleById(article_id).then(({article}) => {
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
                <img className='main-img' src={imageSelctor(article.topic)}/>
            </div>
            <article className='flex-col single-article'>

                <h2>{article.title}</h2>
                <p>{article.body}</p>
                <div className='flex-col aside-container'>
                    <Voter id={article.article_id} votes={article.votes}/>
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
        </main>
    )
}

export default SingleArticle