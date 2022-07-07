import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Snackbar } from '@material-ui/core'
import { AlertTitle } from '@material-ui/lab'
import { auth } from '../../config/firebase'
import MainNav from '../MainNav/MainNav'
import { Alert } from '../../HOC/utils'
import { UserAuth } from '../../HOC/AuthContext'
import { SnackbarContext } from '../../App'
import '../../styles/auth.scss'

const Login = () => {

    const { signInGoogle, user } = UserAuth()
    const snackbar = useContext(SnackbarContext)

    const router = useNavigate()
    const [userInfo, setUserInfo] = useState({ email: '', password: ''})
    const [show, setShow] = useState(false)
    const [signin, setSignin] = useState({ failed: false, verified: false})
    const [error, setError] = useState('')

    useEffect(() => {
        if(user !== null) {
            router('/dashboard')
        }
    }, [user])

    const handleCloseError = (reason) => {
        if (reason === 'clickaway') {
          return
        }
        setSignin({...signin, failed: false})
    }

    const handleCloseVerified = (reason) => {
        if (reason === 'clickaway') {
          return
        }
        setSignin({...signin, verified: false})
    }

    const signInEmail = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then(() => {
            if(auth.currentUser.emailVerified) {
                snackbar.setSuccess(true)
                router('/dashboard')
            } else {
                setSignin({...signin, verified: true})
            }
            setUserInfo({email: '', password: ''})
        })
        .catch(error => {
            if(error.code === 'auth/wrong-password'){
                setError('Invalid Password')
            } 
            else if (error.code === 'auth/user-not-found') {
                setError('Invalid Email')
            }
            else if (error.code === 'auth/user-disabled') {
                setError('Account disabled')
            }
            else if (userInfo.email === '' || userInfo.password === '') {
                setError("Fields can't be empty")
            }
            else {
                setError('Unable to Login. Try again later.')
            }
            setSignin({...signin, verified: false})
            setSignin({...signin, failed: true})
        })
    }

    const handleSignInGoogle = async () => {
        try {
            await signInGoogle()
        } catch (err) {
            console.log(err)
        }
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
                                        type='email'
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
                                onClick={handleSignInGoogle}
                            >
                                Continue with Google <FcGoogle />
                            </button>
                        </div>
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
                            Verify Email
                        </Alert>
                    </Snackbar>
                )}
                {signin.failed && (
                    <Snackbar 
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    open={signin.failed} 
                    autoHideDuration={5000} 
                    onClose={handleCloseError}
                    >
                        <Alert onClose={handleCloseError} severity="error" >
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                    </Snackbar>
                )}
                {signin.verified && (
                    <Snackbar 
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    open={signin.verified} 
                    autoHideDuration={5000} 
                    onClose={handleCloseVerified}
                    >
                        <Alert onClose={handleCloseVerified} severity="warning" >
                            <AlertTitle>Warning</AlertTitle>
                            Verify Your Email
                        </Alert>
                    </Snackbar>
                )}
            </div>
        </>
    )
}

export default Login