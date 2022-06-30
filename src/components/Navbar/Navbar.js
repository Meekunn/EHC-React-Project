import { NavLink } from "react-router-dom"
import { BiSearchAlt } from "react-icons/bi"
import { BsCollectionFill } from "react-icons/bs"
import { IoNotifications, IoPersonCircleOutline } from 'react-icons/io5'
import './navbar.scss'


const Navbar = ({signOutAccount}) => {
    
    return (
        <nav className="nav-wrapper">
            <div className="action-btns1">
                <button
                    onClick={signOutAccount}
                >
                    LOGOUT &#128075;
                </button>
                <NavLink 
                    to='#' 
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
                    <BiSearchAlt />
                </button>
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
