import { useState, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import SchoolCollection from './components/Collections/SchoolCollection'
import PrivateRoute from './HOC/PrivateRoute'
import { auth, provider } from './config/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import './App.css'

export const AuthContext = createContext()
export const SideNavContext = createContext()
export const SnackbarContext = createContext()

function App() {
  
  const [authStatus, setAuthStatus] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useNavigate()

  const signInGoogle = () => {  
    signInWithPopup(auth, provider)
    .then(() => {
      setAuthStatus(true) 
      setSuccess(true)
      router('/dashboard')
    })
    .catch(error => {
        console.log(error.code, error.message)
    })
  }

  const signOutAccount = () => {
    signOut(auth)
    .then(() => {
      setAuthStatus(false)
      router('/login')
    }).catch((err) => {
    });
  }

  const handleCloseSuccess = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSuccess(false)
  }

  const sideNavState = {
    isMobile, setIsMobile
  }
  
  const snackbarValues = {
    success, setSuccess, handleCloseSuccess
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={
          <SnackbarContext.Provider value={snackbarValues}>
            <Login setAuthStatus={setAuthStatus} signInGoogle={signInGoogle} />
          </SnackbarContext.Provider>
        } />
        <Route path="signup" element={
          <SnackbarContext.Provider value={snackbarValues}>
            <SignUp signInGoogle={signInGoogle} />
          </SnackbarContext.Provider>
        } />
        <Route element={<PrivateRoute auth={authStatus} />} >
          <Route path="/dashboard" element={
              <AuthContext.Provider value={signOutAccount}>
                <SideNavContext.Provider value={sideNavState} >
                  <SnackbarContext.Provider value={snackbarValues} >
                    <Dashboard />
                  </SnackbarContext.Provider>
                </SideNavContext.Provider>
              </AuthContext.Provider>
          } />
          <Route path="/dashboard/school" element={
            <AuthContext.Provider value={signOutAccount}>
              <SideNavContext.Provider value={sideNavState} >
                <SchoolCollection />
              </SideNavContext.Provider>
            </AuthContext.Provider>
          } />
        </Route>
      </Routes>
    </div>
  )
}

export default App

