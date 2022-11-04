import bin from '../Images/bin.png'
import { deleteComment } from '../utils/api'

const DeleteComment = ({setDeleteFailed, deleting, setDeleting, comment, setComments, setErrorMsg}) => {

    const handleDelete = () => {
        setDeleting(true)
        deleteComment(comment.comment_id).then(status => {
            if(status === 204) {
                setComments((currentComments) => {
                    return currentComments.filter(currComment => currComment.comment_id !== comment.comment_id)
                })
                setDeleting(false)
                setDeleteFailed(false)
            } else {
                setErrorMsg({status: 'Failed', msg:'delete unsuccessful', method:'deleting'})
                setDeleting(false)
                setDeleteFailed(true)
            }
        }).catch(err => {
            setErrorMsg({status: err.response.status, msg:err.response.data.msg, method:'deleting'})
            setDeleting(false)
            setDeleteFailed(true)
        })
    }
    if(comment.new) return
    return (
        <button disabled={deleting===true} onClick={handleDelete} className="delete flex-row"><p>Delete Comment?</p><img src={bin} aria-label="delete button"  className="bin"/></button>
    )
}

export default DeleteComment