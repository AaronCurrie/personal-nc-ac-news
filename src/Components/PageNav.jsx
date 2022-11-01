import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const PageNav = ({noOfPages, topic, pageNo=1}) => {

    const [pagesArr, setPagesArr] = useState([])
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)
        setPagesArr(Array.from({length: noOfPages}, (_, i) => i + 1))
        setLoading(false)
    }, [noOfPages])


    if(isLoading) return
    return (
        <nav>
            {pagesArr.map(page => {
                return <Link className={page == pageNo? 'active' : ''} to={topic? `/${topic}/${page}` : `/${page}`} key={page}>{page}</Link>
            })}
        </nav>
    )
}

export default PageNav