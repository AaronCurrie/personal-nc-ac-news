import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllArticles } from "../../utils/api"
import Loading from "../Patterns/Loading"
import BigPicture from "./BigPicture"
import Headline from "./Headline"

import headLine2 from '../../Images/headline1.jpg'
import headLine1 from '../../Images/headline2.jpg'
import headLine0 from '../../Images/headline3.jpg'

const pictureArray = [headLine0, headLine1, headLine2]

const Hero = () => {

    const [headLines, setHeadLines] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [currentArticle, setCurrentArticle] = useState();

    useEffect(() => {
        setIsLoading(true)
        getAllArticles(3, '', 2).then(({articles}) => {
            setHeadLines(articles)
            setCurrentArticle(articles[0])
            setIsLoading(false)
        })
    }, [])

    const handleClick = () => {
        window.scrollTo(0, 600)
    }

    if(isLoading) return <Loading/>
    return (
        <section className="hero flex-row">
            <div className="headlines">
                {headLines.map(headline => {
                    return <Headline key={headline.article_id} headline={headline} currentArticle={currentArticle} setCurrentArticle={setCurrentArticle}/>
                })}
                <div onClick={() => handleClick()} className="arrow" >More Articles<span>↓</span></div>
            </div>
            {headLines.map((headline, index) => {
                return <BigPicture key={headline.article_id} headline={headline} picture={pictureArray[index]} currentArticle={currentArticle}/>
            })}
            
        </section>
    )
}

export default Hero