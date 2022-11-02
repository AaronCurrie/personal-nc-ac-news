import { useEffect, useState } from "react"

import Loading from './Loading'
import Comment from './Comment'
import { getArticleComments } from "../utils/api"

const CommentsSection = ({id}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [totalComments, setTotalComments] = useState()
    const [limit, setLimit] = useState(2)
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getArticleComments(id, limit).then((data) => {
            setComments(data.comments)
            setTotalComments(data.total_count)
            setIsLoading(false)
            console.log(limit)
        })
    }, [limit])

    const handleCLick = () => { 
        setLimit(totalComments)
        setIsClicked(true)
    }

    if(isLoading) return <Loading/>
    return (
        <section className="comment-section flex-col">
            <ul className="comment-list flex-col">
              {comments.map(comment => {
                return <Comment key={comment.comment_id} comment={ comment }/>
              })}  
            </ul>
            <button onClick={() => handleCLick()} className={!isClicked? "load-button" : 'hidden'}>Load More</button>
        </section>
    )
}

export default CommentsSection