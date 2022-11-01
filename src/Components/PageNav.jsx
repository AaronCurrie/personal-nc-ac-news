import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { buildSearchString } from "../utils/utils"

const PageNav = ({noOfPages, p}) => {

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
                return <Link className={page == p? `active`:``} to={`?p=${page}`} key={page}>{page}</Link>
            })}
        </nav>
    )
}

export default PageNav