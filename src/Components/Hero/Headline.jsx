
const Headline = ({headline, currentArticle, setCurrentArticle}) => {

    const handleClick = () => {
        setCurrentArticle(headline)
    }

    return (
        <div onClick={() => handleClick()} key={headline.article_id} className={currentArticle.title === headline.title? "headline highlighted" : "headline"}>
            {headline.title}
        </div>
    )
}

export default Headline