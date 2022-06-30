import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import MainNav from '../MainNav/MainNav'
import '../../styles/auth.scss'

const Login = ({ signInGoogle, setAuthStatus }) => {

    const router = useNavigate()
    const [userInfo, setUserInfo] = useState({ email: '', password: ''})
    const [show, setShow] = useState(false)
    const [signin, setSignin] = useState({ success: false, error: ''})

    const signInEmail = (e) => {
        e.preventDefault()
        setSignin({...signin, success: true})
        setAuthStatus(true)

        signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then(userinfo => {
            if(auth.currentUser.emailVerified) {
                alert('successful login')
                router('/dashboard')
                console.log(userinfo.user)
            } else {
                alert('verify your email')
            }
            setUserInfo({email: '', password: ''})
        })
        .catch(err => {
            alert('Invalid Email or Password')
            console.log(signin.error)
            setSignin({...signin, success: false})
            setSignin({...signin, error: err.message})
        })
    }

    return (
        <>
            <MainNav />
            <div className='auth-wrapper'>
                <div className='auth-container'>
                    <div className='auth-form-wrapper'>
                        <h1> Login </h1>
                        <div className='auth-form'>
                            <div className='input-group'>
                                <p>Email: </p>
                                <div className='input-with-icon'>
                                    <input 
                                        placeholder='janedoe@email.com'
                                        value={userInfo.email}
                                        onChange={ e => setUserInfo({...userInfo, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className='input-group'>
                                <p>Password: </p>
                                <div className='input-with-icon'>
                                    <input
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        value={userInfo.password}
                                        onChange={ e => setUserInfo({...userInfo, password: e.target.value})}
                                    />
                                    <button 
                                        onClick={()=>setShow(!show)}
                                    >
                                        {show ? 
                                            <MdVisibilityOff /> 
                                            : 
                                            <MdVisibility /> 
                                        }
                                    </button>
                                </div>
                            </div>
                            <button 
                                className='auth-btn'
                                onClick={signInEmail}
                            >
                                Login
                            </button>
                            <p className='or'>OR</p>
                            <button
                                className='google-btn'
                                onClick={signInGoogle}
                            >
                                Continue with Google <FcGoogle />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login