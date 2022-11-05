import {useState, useEffect} from 'react'
import { postNewArticle } from '../../utils/api'
import Posting from '../Patterns/Posting'
import Error from '../Patterns/PostError'

const NewArticle = ({writeArticle, userName, setPostedNew}) => {

    const [newArticle, setNewArticle] = useState({author: userName, title: '', body: '', topic: 'cooking'})
    const [articleTitleValid, setArticleTitleValid] = useState(false)
    const [articleBodyValid, setArticleBodyValid] = useState(false)
    const [isPosting, setIsPosting] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        newArticle.title.length > 0? setArticleTitleValid(true): setArticleTitleValid(false);
        newArticle.body.length > 0? setArticleBodyValid(true): setArticleBodyValid(false);
    }, [newArticle])

	const handleChange = (key, input) => {
		setNewArticle((current) => {
			return {...current, [key]: input };
		});
	};

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsPosting(true)
        postNewArticle(newArticle).then(() => {
            setPostedNew(true)
            setIsPosting(false)
            setNewArticle({author: userName, title: '', body: '', topic: 'cooking'})
        }).catch(err => {
            setErrorMsg({ status: err.response.status, msg:err.response.data.msg, method:'posting'})
            setNewArticle({author: userName, title: '', body: '', topic: 'cooking'})
        })
    }

    if(errorMsg) return <Error errorMsg={errorMsg} />
    return (
        <form onSubmit={handleSubmit} className={writeArticle? 'flex-col new-article-form' : 'hidden'}>
            <h3>Write New Article</h3>
            <div className="flex-row new-article-inputs">
                <label htmlFor='title'>Title:</label>
                <input type='text' id='title' defaultValue={newArticle.title} name='title' className={articleTitleValid? 'valid' : 'error'} onChange={(event) => handleChange("title", event.target.value)} placeholder="title"></input>
                <label htmlFor='author' className='flex-row'>Author:<p id='author' name='author'>{userName}</p></label>
                
                <label htmlFor='topic'>Topic</label>             
                <select type='dropdown' id='topic' name='topic' onChange={(event) => handleChange("topic", event.target.value)}>
                    <option>cooking</option>
                    <option>football</option>
                    <option>coding</option>
                </select>
                <button disabled className="load-button">Add Category</button>
            </div>
            <textarea onChange={(event) => handleChange('body' ,event.target.value)} defaultValue={newArticle.body} className= {articleBodyValid? 'add-comment valid' : 'add-comment error'} aria-label='add article body' id='newArticleBody' name='newArticleBody' rows='4' cols='50' placeholder="New Article Body..."></textarea>
            {isPosting? <Posting/> : <button type='submit' disabled={!articleTitleValid} className='load-button'>Post</button>}
        </form>
    )
}

export default NewArticle