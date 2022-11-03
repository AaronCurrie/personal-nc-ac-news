import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './Contexts/UserContext'

import { postNewComment } from '../utils/api'

const AddComment = ({id, setComments, setIsPosting, setPostFailed}) => {

    const [newComment, setNewComment] =useState('')
    const [error, setError] = useState(false)
    const { userName } = useContext(UserContext)

    const handleChange = (event) => {
        setNewComment(event.target.value)
        if(event.target.value === '') {
            setError(true)
        } else {
            setError(false)
        }

    }

    const handleSubmit = (event) => {
        newComment === ''? setError(true) : setError(false)
        event.preventDefault()
        setComments((currComments) => {
            return [{author: userName, body: newComment, votes: 0, comment_id: Date.now()}, ...currComments]
        })
        setNewComment('')
        setIsPosting(true)
        postNewComment(id, newComment, userName).then(() => {
            setIsPosting(false)
            setPostFailed(false)
        }).catch(err => {
            setPostFailed(true)
        })

    }

    return (
        <div className='add-comment-container flex-col'>
            <div className='flex-row login'>
                {userName? <p>username: <i>{userName}</i></p> : <Link className='signin'>Log in</Link>}
                {newComment && !userName? <p><i>Log in to post comment</i></p> : <></> }
            </div>

            <form onSubmit={(event) => handleSubmit(event)} className='flex-row'>
                <textarea value={newComment} onChange={(event) => handleChange(event)} className={error?'error add-comment' : 'add-comment'} aria-label='Add new comment' id='newComment' name='newComment' rows='4' cols='50' placeholder="Add a Comment..."></textarea>
                <button type='submit' disabled={newComment==='' || !userName} className='load-button'>Post</button>
            </form>
        </div>

    )
}

export default AddComment