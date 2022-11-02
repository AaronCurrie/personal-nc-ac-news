import { useState } from 'react'

import { postNewComment } from '../utils/api'

const AddComment = ({id, setComments, setIsPosting, setPostFailed}) => {

    const [newComment, setNewComment] =useState('')
    const [error, setError] = useState(false)
    const [userName, setUserName] = useState('tickle122')

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
        //how to error handle this???
        //create login screen
        //remove vote from own comments
        //add delete to own comments
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)} className='flex-row'>
            <textarea value={newComment} onChange={(event) => handleChange(event)} className={error?'error add-comment' : 'add-comment'} aria-label='Add new comment' id='newComment' name='newComment' rows='4' cols='50' placeholder="Add a Comment..."></textarea>
            <button type='submit' disabled={newComment===''} className='load-button'>Post</button>
        </form>
    )
}

export default AddComment