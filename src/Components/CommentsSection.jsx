import { useEffect, useState } from "react"

import Loading from './Loading'
import Comment from './Comment'
import { getArticleComments } from "../utils/api"

const CommentsSection = ({id}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getArticleComments(id).then(({comments}) => {
            setComments(comments)
            setIsLoading(false)
        })
    }, [])

    if(isLoading) return <Loading/>
    return (
        <section className="comment-section">
            <ul className="comment-list flex-col">
              {comments.map(comment => {
                {console.log(comment)}
                return <Comment comment={ comment }/>
              })}  
            </ul>
        </section>
    )
}

export default CommentsSection