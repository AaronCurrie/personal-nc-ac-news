import { Link } from 'react-router-dom'

import error from '../../Images/error.png'

const PostError = ({errorMsg}) => {

    const {status, msg, method} = errorMsg
    return (
        <div className='error-container flex-col'>
            <h4>There was a problem {method} that</h4>
            <p>{status}: {msg}</p>
            <div className='error-img flex-col'><img src={error} /></div>

            <Link onClick={()=>{window.location.reload()}} className='load-button'>Reload Page</Link>
        </div>
    )
}

export default PostError