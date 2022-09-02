/* eslint-disable */
import { memo } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { GoThreeBars } from 'react-icons/go'
import { FaTimes } from 'react-icons/fa'
import { BsCollectionFill } from "react-icons/bs"
import { IoNotifications, IoPersonCircleOutline } from 'react-icons/io5'
import { UserAuth } from '../../HOC/AuthContext'
import { UseSideNav } from '../../HOC/SidenavContext'
import './navbar.scss'


const Navbar = () => {

    const { signOutAccount } = UserAuth()
    const { isMobile, setIsMobile } = UseSideNav()
    const router = useNavigate()

    const handleSignOut = async () => {
        try {
            await signOutAccount()
            router('/login')
        } catch (err) {
            return err
        }
    }
    
    const toggleNav = () => {
        setIsMobile(!isMobile)
    }
    
    return (
        <nav className="nav-wrapper">
            <div className="action-btns1">
                <button className='toggle' onClick={toggleNav}>
                    {isMobile ? <FaTimes /> : <GoThreeBars />}
                </button>
                <button
                    onClick={handleSignOut}
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
