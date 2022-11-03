import { useEffect, useState } from 'react'

import { formatDate } from '../utils/utils'
import { getUserByUserName } from '../utils/api'

import Loading from './Patterns/Loading'

const Author = ({created_at, articleAuthor}) => {

    const [author, setAuthor] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getUserByUserName(articleAuthor)
        .then(({user}) => {
            setAuthor(user)     
            setIsLoading(false)
        })
    }, [])


    if(isLoading) return <Loading/>
    return (
        <aside className='flex-col author'>
            <div className='flex-row author-card'>
                <figure>
                    <img className='avatar' alt='author avatar' src={author.avatar_url}/> 
                </figure>
                <div className='card-info-left flex-col'>
                    <h4>{author.name}</h4>
                    <p>{formatDate(created_at)}</p>
                </div>
            </div>
        </aside>
    )
}

export default Author