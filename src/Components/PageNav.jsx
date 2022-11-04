import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'

const PageNav = ({noOfPages, p=1, sort='created_at', order='DESC'}) => {
    const {topic} = useParams()
    const [pagesArr, setPagesArr] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [forcetopic, setTopic] = useState(topic)
    


    useEffect(() => {
        setLoading(true)
        if(topic === undefined) {
            setTopic(() => 'all')
        } else {
            setTopic(() => '')
        }
        setPagesArr(Array.from({length: noOfPages}, (_, i) => i + 1)) 
        setLoading(false)
    }, [noOfPages])


    if(isLoading) return
    return (
        <nav className="page-nav flex-row">
            <p>Page:</p>
            {pagesArr.map(page => {
                return <Link className={page == p? `active`:``} to={`${forcetopic}?p=${page}&sort_by=${sort}&order=${order}`} key={page}>{page}</Link>
            })}
        </nav>
    )
}

export default PageNav