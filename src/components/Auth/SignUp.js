import { useState } from 'react'
import { 
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth} from '../../config/firebase'
import MainNav from '../MainNav/MainNav'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import '../../styles/auth.scss'

const SignUp = ({signInGoogle}) => {

    const router = useNavigate()
    
    const [userInfo, setUserInfo] = useState({ username: '', email: '', password: ''})
    const [confirmPass, setConfirmPass] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [signUp, setSignUp] = useState({success: false, error: ''})
    

    const signUpEmail = (e) => {
        e.preventDefault()
        setSignUp({...signUp, success: true})

        if (userInfo.password !== confirmPass ) {
            setSignUp.error('Password do not match!')
            console.log(setSignUp.error)
            setSignUp({...signUp, success: false})
        } else {
            setSignUp({...signUp, success: true})
            createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then ((userinfo) => {
                updateProfile(auth.currentUser, {
                    displayName: userInfo.username
                })
                sendEmailVerification(auth.currentUser)
                alert('SignUp Successful,Verify Email and Proceed to Login Page')
                console.log(userinfo.user)
                router('/login')
                setUserInfo({email: '', username: '', password: ''})
            })
            .catch((error) => {

                if(error.code === 'auth/weak-password'){
                    setSignUp.error('Please enter a strong password')
                } 
                else if (error.code === 'auth/email-already-in-use') {
                    setSignUp.error('Email is already in use')
                } 
                else{
                    setSignUp.error('Unable to Sign Up. Try again later.')
                }
    
                setSignUp({...signUp, success: false})
            })
            console.log(signUp.error)
        }
    }

    return (
        <>
            <MainNav />
            <div div className='auth-wrapper'>
                <div className='auth-container'>
                    <div className='auth-form-wrapper'>
                        <h1> Sign Up </h1>
                        <div className='auth-form'>
                            <div className='input-group' >
                                <p> Username: </p>
                                <div className='input-with-icon'>
                                    <input 
                                        placeholder='Jane Doe'
                                        value={userInfo.username}
                                        onChange={ e => setUserInfo({...userInfo, username: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className='input-group' >
                                <p> Email: </p>
                                <div className='input-with-icon'>
                                    <input 
                                        placeholder='janedoe@email.com'
                                        value={userInfo.email}
                                        onChange={ e => setUserInfo({...userInfo, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className='input-group' >
                                <p> Password: </p>
                                <div className='input-with-icon'>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        placeholder='********'
                                        value={userInfo.password}
                                        onChange={ e => setUserInfo({...userInfo, password: e.target.value})}
                                    />
                                    <button 
                                        onClick={()=>setShowPass(!showPass)}
                                    >
                                        {showPass ? 
                                            <MdVisibilityOff backgound='transparent' color='#DE2D66' /> 
                                            : 
                                            <MdVisibility backgound='transparent' color='#DE2D66' /> 
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className='input-group'>
                                <p> Confirm Password: </p>
                                <div className='input-with-icon'>
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder='********'
                                        value={confirmPass}
                                        onChange={(e)=> setConfirmPass(e.target.value)}
                                    />
                                    <button 
                                        onClick={()=>setShowConfirm(!showConfirm)}
                                    >
                                        {showConfirm ? 
                                            <MdVisibilityOff background='transparent' color='#DE2D66' /> 
                                            : 
                                            <MdVisibility background='transparent' color='#DE2D66' /> 
                                        }
                                    </button>
                                </div>
                            </div>
                            <button className='auth-btn'
                                onClick={signUpEmail}
                            >
                                Sign Up
                            </button>
                            <p className='or'>OR</p>
                            <button className="google-btn"
                                onClick={signInGoogle}
                            >
                                Sign Up with Google <FcGoogle />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp