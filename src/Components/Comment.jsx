import { useContext, useState } from 'react'
import { UserContext } from './Contexts/UserContext'

import CommentVoter from './CommentVoter'
import DeleteComment from './DeleteComment'
import Deleting from './Patterns/Deleting'
import Error from './Patterns/PostError'
import Posting from './Patterns/Posting'

const Comment = ({comment, setComments, postFailed, errorMsg, setErrorMsg}) => {
    const { userName } = useContext(UserContext)

    const [deleting, setDeleting] = useState(false)
    const [deleteFailed, setDeleteFailed] = useState(false)

    if(deleteFailed) return <Error errorMsg={errorMsg}/>

    if(postFailed && comment.new) return <Error errorMsg={errorMsg}/>
    return (
        <li className='comment-card flex-col'>
            <div className='flex-row comment-head'>
            <p><i>{comment.author}</i></p> 
            {userName === comment.author? <DeleteComment setErrorMsg={setErrorMsg} setDeleteFailed={setDeleteFailed} deleting={deleting} setDeleting={setDeleting} setComments={setComments} comment={comment} /> : <CommentVoter id={comment.comment_id} votes={comment.votes}/>}
            </div>  
            {deleting? <Deleting/> : <p>{comment.body}</p>}
            {comment.new? <Posting/> : <></>}
        </li>
    )
}

export default Comment