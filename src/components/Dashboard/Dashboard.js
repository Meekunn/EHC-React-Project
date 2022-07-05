import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { IoSchool, IoPersonSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import { auth } from '../../config/firebase'
import Navbar from "../Navbar/Navbar"
import SideNav from '../SideNav/SideNav'
import { Snackbar } from '@material-ui/core'
import { AlertTitle } from '@material-ui/lab'
import { SnackbarContext } from '../../App'
import { 
    createPersonalCollection, 
    createSchoolCollection, 
    createWorkCollection,
    Alert
} from '../../HOC/utils'
import './dashboard.scss'

const Dashboard = () => {
    
    const snackbar = useContext(SnackbarContext)

    const router = useNavigate()
    const [userName, setUserName] = useState('')
    const [userUid, setUserUid] = useState('')

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        const user = auth.currentUser
        if(user !== null) {
            user.providerData.forEach((profile) => {
                setUserName(profile.displayName)
                setUserUid(profile.uid)
            })
            const username = user.displayName
            setUserName(username)
            setUserUid(user.uid)
        } else {
            console.log('no user found')
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
                            onClick={()=>{createPersonalCollection(userUid, userName); router('/dashboard/school')}}
                        >
                            <span className='icons'
                                style={{backgroundColor: '#33948D'}}
                            >
                                <IoPersonSharp />
                            </span>
                            Personal
                        </button>
                        <button
                            onClick={()=>{createWorkCollection(userUid, userName); router('/dashboard/school')}}
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
                {snackbar.success && (
                    <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }} 
                    open={snackbar.success} 
                    autoHideDuration={5000} 
                    onClose={snackbar.handleCloseSuccess}
                    >
                        <Alert onClose={snackbar.handleCloseSuccess} severity="success" >
                            <AlertTitle>Success</AlertTitle>
                            Login Successful
                        </Alert>
                    </Snackbar>
                )}
            </div>
        </>
    )
    
}
export default Dashboard