import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { IoSchool, IoPersonSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import Navbar from "../Navbar"
import SideNav from "../SideNav"
// import { 
//     createPersonalCollection, 
//     createSchoolCollection, 
//     createWorkCollection,
// } from '../../HOC/utils'
import { UserAuth } from '../../HOC/AuthContext'
import './dashboard.scss'
import useCreateCollection from '../../hooks/useCreateCollection'

const Dashboard = () => {

    const router = useNavigate()
    const { userName, userUid } = UserAuth()
    const { createCollection } = useCreateCollection()

    const createEachCollection = (name) => {
        createCollection(name)
        router(`/dashboard/${name}`)
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
                            //onClick={()=>{createSchoolCollection('school'); router('/dashboard/school')}}
                            onClick={() => createEachCollection('school')}
                        >
                            <span className='icons'
                                style={{backgroundColor: '#F75F8C'}}
                            >
                                <IoSchool />
                            </span>
                            School
                        </button>
                        <button
                            onClick={() => createEachCollection('personal')}
                            //onClick={()=>{createPersonalCollection(userUid, userName); router('/dashboard/personal')}}
                        >
                            <span className='icons'
                                style={{backgroundColor: '#33948D'}}
                            >
                                <IoPersonSharp />
                            </span>
                            Personal
                        </button>
                        <button
                            onClick={() => createEachCollection('work')}
                            //onClick={()=>{createWorkCollection(userUid, userName); router('/dashboard/work')}}
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