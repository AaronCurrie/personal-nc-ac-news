import { useState } from 'react'

const MobileMenu = (props) => {
    const {children} = props

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        if(isOpen === false) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }

    if(isOpen) return (
        <button className='menu' onClick={handleClick}>             
            <div  className="hamburger-lines">
                <span className="line line1cross"></span>
                <span className="line line2cross"></span>
                <span className="line line3cross"></span>
            </div>
            <div className='cat-nav flex-col'>{children}</div>
        </button>
    )
    return (
        <button className='menu' onClick={handleClick}>
            <div onClick={() => handleClick()} className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
        </button>
    )   
}

export default MobileMenu