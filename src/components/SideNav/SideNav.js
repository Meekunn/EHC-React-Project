import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoSchool, IoPersonAddSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import { SideNavContext } from "../../App"
import './sidenav.scss'

const SideNav = () => {

    const sideNavToggle = useContext(SideNavContext)
    const router = useNavigate()

    return (
        <div className={sideNavToggle.isMobile? 'sidenav-wrapper mobile' : 'sidenav-wrapper'}>
            <div className='sidenav-container'>
                <h2>Collections</h2>
                <div className='sidenav-links'>
                    <button className='sidenav-btn' onClick={() => {router('/dashboard/school'); sideNavToggle.setIsMobile(false)}}>
                    <span
                        style={{
                            backgroundColor: '#F7578C'
                        }}
                    >
                        <IoSchool />
                    </span>
                        School
                    </button>
                    <button className='sidenav-btn'>
                    <span
                        style={{
                            backgroundColor: '#33948D'
                        }}
                    >
                        <IoPersonAddSharp />
                    </span>
                        Personal
                    </button>
                    <button className='sidenav-btn'>
                    <span
                        style={{
                            backgroundColor: '#AC4089'
                        }}
                    >
                        <MdWork />
                    </span>
                        Work
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideNav