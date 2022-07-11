import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { IoSchool, IoPersonSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import Navbar from "../Navbar/Navbar"
import SideNav from '../SideNav/SideNav'
import { 
    createPersonalCollection, 
    createSchoolCollection, 
    createWorkCollection,
} from '../../HOC/utils'
import { UserAuth } from '../../HOC/AuthContext'
import './dashboard.scss'

const Dashboard = () => {

    const router = useNavigate()
    const { user } = UserAuth()
    const [userName, setUserName] = useState('')
    const [userUid, setUserUid] = useState('')

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        if(user !== null) {
            const username = user.displayName
            setUserName(username)
            setUserUid(user.uid)
        } 
    }

    return (
        <>
            <Navbar />
            <div className='dash-wrapper'>
                <SideNav />
                <div className="dash-container">
                    <div className='typewriter'>
                        <Typewriter
                            options={{
                                strings: [`Welcome Back  ${userName}`, "Wanna Tick Off Something Today?"],
                                autoStart: true,
                                loop: true,
                                delay: 100,
                                deleteSpeed: 50,
                                cursorClassName: "cursor",
                            }}
                        />
                    </div>
                    <div className="btns-wrapper">
                        <button
                            onClick={()=>{createSchoolCollection(userUid, userName); router('/dashboard/school')}}
                        >
                            <span className='icons'
                                style={{backgroundColor: '#F75F8C'}}
                            >
                                <IoSchool />
                            </span>
                            School
                        </button>
                        <button
                            onClick={()=>{createPersonalCollection(userUid, userName); router('/dashboard/personal')}}
                        >
                            <span className='icons'
                                style={{backgroundColor: '#33948D'}}
                            >
                                <IoPersonSharp />
                            </span>
                            Personal
                        </button>
                        <button
                            onClick={()=>{createWorkCollection(userUid, userName); router('/dashboard/work')}}
                        >
                            <span className='icons' 
                                style={{backgroundColor: '#AC6089'}}
                            >
                                <MdWork />
                            </span>
                            Work
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
    
}
export default Dashboard