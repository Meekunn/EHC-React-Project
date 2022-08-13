import { FaCheck } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import './mainnav.scss'

const MainNav = () => {

    return (
        <nav className="mainnav-wrapper" >
            <div className='logo-section'>
                <div className='logo-wrapper'>
                    <FaCheck color='#D3B8BA' fontSize='1.2rem' />
                </div>
                <h1>tsks.</h1>
                <p>Features</p>
            </div>
            <div className='navlinks-wrapper'>
                <NavLink to='/login' 
                    className={({ isActive }) =>
                        isActive ? "nav-links activelink" : "nav-links"
                    } 
                >Log in</NavLink>
                <NavLink to='/signup' 
                    className={({ isActive }) =>
                        isActive ? "nav-links activelink" : "nav-links"
                    } 
                >Sign up</NavLink>
            </div>
        </nav>
    )
}

export default MainNav