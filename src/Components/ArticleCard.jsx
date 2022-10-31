import { Link } from 'react-router-dom'

import football from '../Images/football.jpg';
import cooking from '../Images/cooking.jpg';
import coding from '../Images/coding.jpg';
import defaultImg from '../Images/default.jpg'

const ArticleCard = ({article}) => {

    function imageSelctor(topic) {
        switch (topic) {
            case 'football':
                return football;
            case 'coding':
                return coding;
            case 'cooking':
                return cooking;
            default:
                return defaultImg;
        }
    }

    return (
        <Link className="flex-col main-card" to={`${article.article_id}`}>
            <li className='flex-col card-inner'>
                <img src={imageSelctor(article.topic)}/>
                <h3>{article.title}</h3>
                <div className="flex-row card-info">
                    <p>topic: {article.topic}</p>
                    <p>author: {article.author}</p>
                </div>
            </li>
        </Link>

    )
}

export default ArticleCard