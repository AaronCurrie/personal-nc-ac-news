import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav className="flex-row">
                <Link to='/'><h1>ACNC NEWS</h1></Link>
            </nav>
        </header>
    )
}

export default Header