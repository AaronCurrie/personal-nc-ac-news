import { useEffect, useState } from "react"

import { getArticleComments } from "../utils/api"

import Loading from './Patterns/Loading'
import Comment from './Comment'
import AddComment from "./AddComment"
import Error from './Patterns/PostError'

const CommentsSection = ({id}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [totalComments, setTotalComments] = useState()
    const [limit, setLimit] = useState(4)
    const [isClicked, setIsClicked] = useState(false)
    const [postFailed, setPostFailed] = useState(false)
    const [postSuccess, setPostSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [getErrorMsg, setGetErrorMsg] = useState(null)

    useEffect(() => {
        setIsLoading(true) 
        getArticleComments(id, limit).then((data) => {
            setComments(data.comments)
            setTotalComments(data.total_count)
            setIsLoading(false)
        }).catch(err => {
            setGetErrorMsg({ status: err.response.status, msg:err.response.data.msg, method:'getting'})
            setIsLoading(false)
        })
    }, [isClicked])

    useEffect(() => {
        getArticleComments(id, limit).then((data) => {
            setComments(data.comments)
            setTotalComments(data.total_count)
            setPostSuccess(false)
        }).catch(err => {
            setGetErrorMsg({ status: err.response.status, msg:err.response.data.msg, method:'getting'})
        })
    }, [postSuccess])

    const handleMoreCLick = () => { 
        setLimit(totalComments)
        setIsClicked(true)
    }

    const handleLessCLick = () => { 
        setLimit(4)
        setIsClicked(false)
    }

    if(getErrorMsg) return <Error errorMsg={getErrorMsg}/>
    if(isLoading) return <Loading/>
    return (
        <section className="comment-section flex-col">
            <AddComment setErrorMsg={setErrorMsg} setPostSuccess={setPostSuccess} setPostFailed={setPostFailed} setComments={setComments} id={id}/>
            <ul className="comment-list flex-col">
                {comments.map(comment => {
                    return <Comment errorMsg={errorMsg} setErrorMsg={setErrorMsg} key={comment.comment_id} postFailed={postFailed} setComments={setComments} comment={ comment }/>}
                )}
            </ul>
            <button onClick={() => handleMoreCLick()} className={!isClicked? "load-button" : 'hidden'}>Load More</button>
            <button onClick={() => handleLessCLick()} className={isClicked? "load-button" : 'hidden'}>Load Less</button>
        </section>
    )
}

export default CommentsSection