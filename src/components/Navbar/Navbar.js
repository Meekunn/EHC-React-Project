import { NavLink } from "react-router-dom"
import { GoThreeBars } from 'react-icons/go'
import { FaTimes } from 'react-icons/fa'
import { BsCollectionFill } from "react-icons/bs"
import { IoNotifications, IoPersonCircleOutline } from 'react-icons/io5'
import './navbar.scss'


const Navbar = ({isMobile, toggleSideNav, signOutAccount}) => {
    
    
    return (
        <nav className="nav-wrapper">
            <div className="action-btns1">
                <button className='toggle' onClick={toggleSideNav}>
                    {isMobile ? <FaTimes /> : <GoThreeBars />}
                </button>
                <button
                    onClick={signOutAccount}
                >
                    LOGOUT &#128075;
                </button>
                <NavLink 
                    to='/dashboard' 
                    className='nav-links' 
                    style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center',
                    }}
                >
                    <BsCollectionFill/>
                    <p>Collections</p>
                </NavLink>
            </div>
            <div className="action-btns2">
                <button>
                    <IoNotifications />
                </button>
                <button>
                    <IoPersonCircleOutline />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
