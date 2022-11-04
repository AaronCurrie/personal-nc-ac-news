import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const PageNav = ({noOfPages, p=1, sort='created_at', order='DESC'}) => {

    const [pagesArr, setPagesArr] = useState([])
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)
        setPagesArr(Array.from({length: noOfPages}, (_, i) => i + 1)) 
        setLoading(false)
    }, [noOfPages])


    if(isLoading) return
    return (
        <nav className="page-nav flex-row">
            {pagesArr.map(page => {
                return <Link className={page == p? `active`:``} to={`?p=${page}&sort_by=${sort}&order=${order}`} key={page}>{page}</Link>
            })}
        </nav>
    )
}

export default PageNav