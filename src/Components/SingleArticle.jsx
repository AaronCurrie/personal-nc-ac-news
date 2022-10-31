import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleArticle = ({setCurrTopic}) => {
 
    const {article_id} = useParams()

    useEffect(() => {
       setCurrTopic('none') 
    }, [])
    

    return (
        <div>

        </div>
    )
}

export default SingleArticle