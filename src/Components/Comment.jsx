import CommentVoter from './CommentVoter'

const Comment = ({comment}) => {
    return (
        <li className='comment-card flex-col'>
            <div className='flex-row comment-head'>
            <p><i>{comment.author}</i></p> 
            <CommentVoter id={comment.comment_id} votes={comment.votes}/>   
            </div>
            
            <p>{comment.body}</p>
            
        </li>
    )
}

export default Comment