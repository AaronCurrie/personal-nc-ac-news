
const ArticleCard = ({article}) => {

    return (
        <li className="flex-col main-card">
            <h3>{article.title}</h3>
            <div className="flex-row card-info">
                <p>topic: {article.topic}</p>
                <p>author: {article.author}</p>
            </div>

        </li>
    )
}

export default ArticleCard