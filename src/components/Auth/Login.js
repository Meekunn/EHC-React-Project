import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { signInWithEmailAndPassword, getRedirectResult } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import { auth } from '../../config/firebase'
import Spinner from '../Spinner'
import MainNavbar from '../MainNavbar'
import { UserAuth } from '../../HOC/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import './auth.scss'

const Login = () => {

    const { signInGoogle, user } = UserAuth()

    const router = useNavigate()
    const [userInfo, setUserInfo] = useState({ email: '', password: ''})
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user.providerId === 'google.com') {
            setIsLoading(true)
            getRedirectResult(auth)
            .then(() => {
                setIsLoading(false)
                if(auth.currentUser) {
                    router('/dashboard')
                } 
            })
        }
    }, [user])

    const signInEmail = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then(() => {
            router('/dashboard')
            setUserInfo({email: '', password: ''})
        })
        .catch(error => {
            if(error.code === 'auth/wrong-password'){
                toast.error('Invalid Password')
            } 
            else if (error.code === 'auth/user-not-found') {
                toast.error('Invalid Email')
            }
            else if (error.code === 'auth/user-disabled') {
                toast.error('Account disabled')
            }
            else if (userInfo.email === '' || userInfo.password === '') {
                toast.warn("Fields can't be empty")
            }
            else {
                toast.error('Unable to Login. Try again later.')
            }
        })
    }

    const handleSignInGoogle = async () => {
        try {
            await signInGoogle()
        } catch (err) {
            toast.error('Unable to Login. Try again later.')
        }
    }

    return (
        <>
            <MainNavbar />
            <div className='auth-wrapper'>
                {isLoading ? 
                    <Spinner />
                        : 
                    <>
                        <ToastContainer position="bottom-left" style={{width: '70%', margin: '1rem'}} />
                        <div className='auth-container'>
                            <div className='auth-form-wrapper'>
                                <h1> Login </h1>
                                <div className='auth-form'>
                                    <div className='input-group'>
                                        <p>Email: </p>
                                        <div className='input-with-icon'>
                                            <input 
                                                type='email'
                                                required
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
                                                required
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
                                        onClick={handleSignInGoogle}
                                    >
                                        Continue with Google <FcGoogle />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Login