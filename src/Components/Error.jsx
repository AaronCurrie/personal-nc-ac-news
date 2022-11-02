import { Link } from 'react-router-dom'

import error from '../Images/error.png'

const Error = () => {
    return (
        <div className='error-container flex-col'>
            <h4>There was a problem posting your comment</h4>
            <div className='error-img flex-col'><img src={error} /></div>
            <Link onClick={()=>{window.location.reload()}} className='load-button'>Reload Page</Link>
        </div>
    )
}

export default Error