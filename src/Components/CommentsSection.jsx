import { useEffect, useState } from "react"

import { getArticleComments } from "../utils/api"

import Loading from './Patterns/Loading'
import Comment from './Comment'
import AddComment from "./AddComment"
import Posting from "./Patterns/Posting"
import Error from './Patterns/Error'

const CommentsSection = ({id}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [totalComments, setTotalComments] = useState()
    const [limit, setLimit] = useState(2)
    const [isClicked, setIsClicked] = useState(false)
    const [isPosting, setIsPosting] =useState(false)
    const [postFailed, setPostFailed] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getArticleComments(id, limit).then((data) => {
            setComments(data.comments)
            setTotalComments(data.total_count)
            setIsLoading(false)
        })
    }, [limit])

    const handleMoreCLick = () => { 
        setLimit(totalComments)
        setIsClicked(true)
    }

    const handleLessCLick = () => { 
        setLimit(2)
        setIsClicked(false)
    }
    
    //remove vote from own comments
    //add delete to own comments
    if(isLoading) return <Loading/>
    if(postFailed) return <Error/>
    return (
        <section className="comment-section flex-col">
            <AddComment setPostFailed={setPostFailed} setIsPosting={setIsPosting} setComments={setComments} id={id}/>
            {isPosting? <Posting/> : <ul className="comment-list flex-col">{comments.map(comment => {return <Comment key={comment.comment_id} comment={ comment }/>})}</ul>}
            <button onClick={() => handleMoreCLick()} className={!isClicked && !isPosting? "load-button" : 'hidden'}>Load More</button>
            <button onClick={() => handleLessCLick()} className={isClicked && !isPosting? "load-button" : 'hidden'}>Load Less</button>
        </section>
    )
}

export default CommentsSection