import { memo, useContext } from "react"
import { NavLink } from "react-router-dom"
import { GoThreeBars } from 'react-icons/go'
import { FaTimes } from 'react-icons/fa'
import { BsCollectionFill } from "react-icons/bs"
import { IoNotifications, IoPersonCircleOutline } from 'react-icons/io5'
import { AuthContext, SideNavContext } from "../../App"
import './navbar.scss'


const Navbar = () => {

    const signOut = useContext(AuthContext)
    const sideNavToggle = useContext(SideNavContext)
    
    const toggleNav = () => {
        sideNavToggle.setIsMobile(!sideNavToggle.isMobile)
    }
    
    return (
        <nav className="nav-wrapper">
            <div className="action-btns1">
                <button className='toggle' onClick={toggleNav}>
                    {sideNavToggle.isMobile ? <FaTimes /> : <GoThreeBars />}
                </button>
                <button
                    onClick={signOut}
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

export default memo(Navbar)
