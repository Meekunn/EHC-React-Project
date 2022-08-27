import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth} from '../../config/firebase'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import MainNavbar from '../MainNavbar'
import { UserAuth } from '../../HOC/AuthContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './auth.scss'

const iconStyle = {
    background: 'transparent',
    color: '#DE2D66'
}

const SignUp = () => {

    const router = useNavigate()
    
    const [userInfo, setUserInfo] = useState({ username: '', email: '', password: ''})
    const [confirmPass, setConfirmPass] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const { signOutAccount } = UserAuth()

    const signUpEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (userInfo.password !== confirmPass ) {
            toast.warn('Password do not match!')
        } 
        else if (userInfo.username === '' || userInfo.email === '' || userInfo.password === '' ) {
            toast.warn('Fields cannot be empty')
        }
        else {
            createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then (async () => {
                if (auth.currentUser) {
                    await updateProfile(auth.currentUser, {
                        displayName: userInfo.username
                    })
                    setUserInfo({email: '', username: '', password: ''})
                    await signOutAccount()
                    router('/login')
                }
            })
            .catch((error) => {
                if(error.code === 'auth/weak-password') {
                    toast.error('Please enter a strong password')
                }
                else if (error.code === 'auth/email-already-in-use') {
                    toast.error('Email is already in use')
                } 
                else{
                    toast.error('Unable to Sign Up. Try again later.')
                }
            })
        } 
    }

    return (
        <>
            <MainNavbar />
            <div className='auth-wrapper'>
                    <ToastContainer position="bottom-left" style={{width: '70%', margin: '1rem'}} />
                <div className='auth-container'>
                    <div className='auth-form-wrapper'>
                        <h1> Sign Up </h1>
                        <form className='auth-form'>
                            <div className='input-group' >
                                <p> Username: </p>
                                <div className='input-with-icon'>
                                    <input 
                                        required
                                        type='text'
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
                                        required
                                        type='email'
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
                                        required
                                        type={showPass ? 'text' : 'password'}
                                        placeholder='********'
                                        value={userInfo.password}
                                        onChange={ e => setUserInfo({...userInfo, password: e.target.value})}
                                    />
                                    <button 
                                        onClick={()=>setShowPass(!showPass)}
                                    >
                                        {showPass ? 
                                            <MdVisibilityOff style={iconStyle} /> 
                                            : 
                                            <MdVisibility style={iconStyle} /> 
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className='input-group'>
                                <p> Confirm Password: </p>
                                <div className='input-with-icon'>
                                    <input
                                        required
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder='********'
                                        value={confirmPass}
                                        onChange={(e)=> setConfirmPass(e.target.value)}
                                    />
                                    <button 
                                        onClick={()=>setShowConfirm(!showConfirm)}
                                    >
                                        {showConfirm ? 
                                            <MdVisibilityOff style={iconStyle} /> 
                                            : 
                                            <MdVisibility style={iconStyle} /> 
                                        }
                                    </button>
                                </div>
                            </div>
                            <button className='auth-btn' onClick={signUpEmail} type='submit'>
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp