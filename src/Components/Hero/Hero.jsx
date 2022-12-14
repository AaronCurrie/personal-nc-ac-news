import { useEffect, useState } from "react"
import { getAllArticles } from "../../utils/api"
import Loading from "../Patterns/Loading"
import BigPicture from "./BigPicture"
import Headline from "./Headline"
import Error from '../Patterns/PostError'

import headLine2 from '../../Images/headline1.jpg'
import headLine1 from '../../Images/headline2.jpg'
import headLine0 from '../../Images/headline3.jpg'

const pictureArray = [headLine0, headLine1, headLine2]

const Hero = () => {

    const [headLines, setHeadLines] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [currentArticle, setCurrentArticle] = useState();
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        getAllArticles(3, '', 1, 'votes').then(({articles}) => {
            setHeadLines(articles)
            setCurrentArticle(articles[0])
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            setErrorMsg({ status: err.response.status, msg:err.response.data.msg, method:'getting'})
        })
    }, [])

    const handleClick = () => {
        window.scrollTo(0, 600)
    }

    if(errorMsg) return <Error errorMsg={errorMsg}/>
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