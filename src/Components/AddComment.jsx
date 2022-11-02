import { useState } from 'react'
import { postNewComment } from '../utils/api'

const AddComment = ({id, setComments}) => {

    const [newComment, setNewComment] =useState(null)
    const [error, setError] = useState(false)
    const [userName, setUserName] = useState('tickle122')

    const handleChange = (event) => {
        setNewComment(event.target.value)
        setError(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(error) {
            console.log('comment')
        } else {
            newComment? setError(false) : setError(true)
            postNewComment(id, newComment, userName).then(({comment}) => {
            setComments((currComments) => {
                return currComments = [{author: userName, body: newComment, votes: 0, comment_id: Date.now()}, ...currComments]
            })
            setNewComment(null)
            })
        }

    }

    return (
        <form onSubmit={(event) => handleSubmit(event)} className='flex-row'>
            <textarea onChange={(event) => handleChange(event)} className={error? 'add-comment error' : "add-comment"} aria-label='Add new comment' id='newComment' name='newComment' rows='4' cols='50' placeholder="Add a Comment..."></textarea>
            <button type='submit' className='load-button'>Post</button>
        </form>
    )
}

export default AddComment