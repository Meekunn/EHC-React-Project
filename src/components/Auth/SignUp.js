import React, { useState } from 'react'
import { 
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth} from '../../config/firebase'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import MainNav from '../MainNav/MainNav'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './auth.scss'

const SignUp = () => {

    const router = useNavigate()
    
    const [userInfo, setUserInfo] = useState({ username: '', email: '', password: ''})
    const [confirmPass, setConfirmPass] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const signUpEmail = (e) => {
        e.preventDefault()

        if (userInfo.password !== confirmPass ) {
            toast.warn('Password do not match!')
        } 
        else if (userInfo.username === '' || userInfo.email === '' || userInfo.password === '' ) {
            toast.warn('Fields cannot be empty')
        }
        else {
            createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then (() => {
                toast.success('Sign Up Successful')
                toast.warn('Verify Your Email')
                updateProfile(auth.currentUser, {
                    displayName: userInfo.username
                })
                sendEmailVerification(auth.currentUser)
                router('/login')
                setUserInfo({email: '', username: '', password: ''})
            })
            .catch((error) => {

                if(error.code === 'auth/weak-password'){
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
            <MainNav />
            <div div className='auth-wrapper'>
                    <ToastContainer position="bottom-left" style={{width: '70%', margin: '1rem'}} />
                <div className='auth-container'>
                    <div className='auth-form-wrapper'>
                        <h1> Sign Up </h1>
                        <div className='auth-form'>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp