import { useEffect, useState } from "react"

const PageNav = (pages) => {

    const [pagesArr, setPageArr] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        for(let i = 1; i <= pages; i++) {
            setPageArr((current) => {
                return [...current, i]
            })
        }
        console.log(pagesArr)
        setLoading(false)
    }, [])


    return (
        <nav>
            {pagesArr.map(page => {
                return <button>{page}</button>
            })}
        </nav>
    )
}

export default PageNav