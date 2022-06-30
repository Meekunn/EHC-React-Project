import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { doc, setDoc } from 'firebase/firestore'
import { IoSchool, IoPersonSharp } from 'react-icons/io5'
import { MdWork } from 'react-icons/md'
import { auth, db } from '../../config/firebase'
import Navbar from "../Navbar/Navbar"
import './dashboard.scss'

const Dashboard = ({signOutAccount}) => {

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

    const createSchoolCollection = async () => {
        const docRef = doc(db, 'school', userUid)
        const payload = {
            userName
        }
        const setDocRef = await setDoc(docRef, payload)
        router('/dashboard/school')
    }

    const createWorkCollection = async () => {
        const docRef = doc(db, 'work', userUid)
        const payload = {
            userName
        }
        const setDocRef = await setDoc(docRef, payload)
        router('/dashboard/school')
    }

    const createPersonalCollection = async () => {
        const docRef = doc(db, 'personal', userUid)
        const payload = {
            userName
        }
        const setDocRef = await setDoc(docRef, payload)
        router('/dashboard/school')
    }

    return (
        <>
            <Navbar signOutAccount={signOutAccount} />
            <div className='dash-wrapper'>
                <div className="dash-container">
                    {/* <p>
                        Hello {userName}
                    </p> */}
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
                            onClick={createSchoolCollection}
                        >
                            <span className='icons'
                                style={{backgroundColor: '#F75F8C'}}
                            >
                                <IoSchool />
                            </span>
                            School
                        </button>
                        <button
                            onClick={createPersonalCollection}
                        >
                            <span className='icons'
                                style={{backgroundColor: '#33948D'}}
                            >
                                <IoPersonSharp />
                            </span>
                            Personal
                        </button>
                        <button
                            onClick={createWorkCollection}
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