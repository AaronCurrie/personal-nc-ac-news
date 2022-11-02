import { Link } from 'react-router-dom'
import { imageSelctor } from '../utils/images';

const ArticleCard = ({article}) => {

    return (
        <Link className="flex-col main-card" to={`/articles/${article.article_id}`}>
            <li className='flex-col main-card-holder'>
                <img src={imageSelctor(article.topic, article.article_id)}/>
                <div className='card-inner flex-col'>
                    <h3>{article.title}</h3>
    
                    <div className="flex-row card-info">
                        <p>author: {article.author}</p>
                        <p>{article.topic}</p>
                    </div>

                </div>
                <div className="flex-row likes-votes">
                    <p>	&#129293; {article.votes}</p>
                    <p> &#128172; {article.comment_count}</p>
                </div>   
            </li>
        </Link>

    )
}

export default ArticleCard