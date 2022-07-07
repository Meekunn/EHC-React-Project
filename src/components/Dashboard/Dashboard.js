import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { IoSchool, IoPersonSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
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
import { UserAuth } from '../../HOC/AuthContext'
import './dashboard.scss'

const Dashboard = () => {
    
    const { user } = UserAuth()
    const snackbar = useContext(SnackbarContext)
    const router = useNavigate()

    return (
        <>
            <Navbar />
            <div className='dash-wrapper'>
                <SideNav />
                <div className="dash-container">
                    <div className='typewriter'>
                        <Typewriter
                            options={{
                                strings: [`Welcome Back  ${user?.displayName}`, "Wanna Tick Off Something Today?"],
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
                            onClick={()=>{createSchoolCollection(user?.uid, user?.displayName); router('/dashboard/school')}}
                        >
                            <span className='icons'
                                style={{backgroundColor: '#F75F8C'}}
                            >
                                <IoSchool />
                            </span>
                            School
                        </button>
                        <button
                            onClick={()=>{createPersonalCollection(user?.uid, user?.displayName); router('/dashboard/personal')}}
                        >
                            <span className='icons'
                                style={{backgroundColor: '#33948D'}}
                            >
                                <IoPersonSharp />
                            </span>
                            Personal
                        </button>
                        <button
                            onClick={()=>{createWorkCollection(user?.uid, user?.displayName); router('/dashboard/school')}}
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