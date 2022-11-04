import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const BigPicture = ({currentArticle, picture, headline}) => {

    return (
        <div className={currentArticle.title === headline.title? "big-picture" : "big=picture hidden"}>
            <img className='hero-img' src={picture}/>
            <Link to={`/articles/${currentArticle.article_id}`}><h2 className='hero-title'>{headline.title}</h2></Link>
        </div>
    )
}

export default BigPicture