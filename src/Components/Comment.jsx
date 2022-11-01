
const Comment = ({comment}) => {
    return (
        <li className='comment-card'>{comment.body}</li>
    )
}

export default Comment