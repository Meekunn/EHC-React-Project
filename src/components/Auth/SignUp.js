import React, { useState, useContext } from 'react'
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
import { Snackbar } from '@material-ui/core'
import { AlertTitle } from '@material-ui/lab'
import { Alert } from '../../HOC/utils'
import { SnackbarContext } from '../../App'
import '../../styles/auth.scss'

const SignUp = ({signInGoogle}) => {

    const router = useNavigate()
    const snackbar = useContext(SnackbarContext)
    
    const [userInfo, setUserInfo] = useState({ username: '', email: '', password: ''})
    const [confirmPass, setConfirmPass] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [signUp, setSignUp] = useState({failed: false, verified: false})
    const [error, setError] = useState('')

    const handleCloseError = (reason) => {
        if (reason === 'clickaway') {
            console.log('handclose')
            return
        }
        setSignUp({...signUp, failed: false})
    }

    const handleCloseVerified = (reason) => {
        if (reason === 'clickaway') {
            console.log('handclose')
          return
        }
        setSignUp({...signUp, verified: false})
    }
    

    const signUpEmail = (e) => {
        e.preventDefault()

        if (userInfo.password !== confirmPass ) {
            setError('Password do not match!')
            setSignUp({...signUp, verified: true})
        } 
        else if (userInfo.username === '' || userInfo.email === '' || userInfo.password === '' ) {
            setError("Fields can't be empty")
            setSignUp({...signUp, failed: true})
        }
        else {
            createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then (() => {
                snackbar.setSuccess(true)
                setSignUp({...signUp, verified: false})
                updateProfile(auth.currentUser, {
                    displayName: userInfo.username
                })
                sendEmailVerification(auth.currentUser)
                router('/login')
                setUserInfo({email: '', username: '', password: ''})
            })
            .catch((error) => {

                if(error.code === 'auth/weak-password'){
                    setError('Please enter a strong password')
                } 
                else if (error.code === 'auth/email-already-in-use') {
                    setError('Email is already in use')
                } 
                else{
                    setError('Unable to Sign Up. Try again later.')
                }
                setSignUp({...signUp, failed: true})
            })
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
                            <p className='or'>OR</p>
                            <button className="google-btn"
                                onClick={signInGoogle}
                            >
                                Sign Up with Google <FcGoogle />
                            </button>
                        </div>
                    </div>
                </div>
                {signUp.failed && (
                    <Snackbar 
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    open={signUp.failed} 
                    autoHideDuration={6000} 
                    onClose={handleCloseError}
                    >
                        <Alert onClose={handleCloseError} severity="error" >
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                )}
                {signUp.verified && (
                    <Snackbar 
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    open={signUp.verified} 
                    autoHideDuration={6000} 
                    onClose={handleCloseVerified}
                    >
                        <Alert onClose={handleCloseVerified} severity="warning" >
                            <AlertTitle>Warning</AlertTitle>
                            Passwords do not Match
                        </Alert>
                    </Snackbar>
                )}
            </div>
        </>
    )
}

export default SignUp