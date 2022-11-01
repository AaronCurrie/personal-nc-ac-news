import { Link } from 'react-router-dom'
import { imageSelctor } from '../utils/utils';

const ArticleCard = ({article}) => {

    return (
        <Link className="flex-col main-card" to={`/articles/${article.article_id}`}>
            <li className='flex-col main-card-holder'>
                <img src={imageSelctor(article.topic)}/>
                <div className='card-inner flex-col'>
                    <h3>{article.title}</h3>
                    <div className="flex-row card-info">
                        <p>topic: {article.topic}</p>
                        <p>author: {article.author}</p>
                    </div>    
                </div>

            </li>
        </Link>

    )
}

export default ArticleCard