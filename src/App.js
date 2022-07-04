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

function App() {
  
  const [authStatus, setAuthStatus] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useNavigate()

  const signInGoogle = () => {  
    setAuthStatus(true) 
    signInWithPopup(auth, provider)
    .then((res) => {
        console.log("success", res)
        alert("Success with Google")
        router('/dashboard')
    })
    .catch(error => {
        console.log(error.code, error.message)
    })
  }

  const signOutAccount = () => {
    console.log('signout here')
    signOut(auth)
    .then(() => {
      setAuthStatus(false)
      router('/login')
    }).catch((error) => {
      console.log('logged out', error)
    });
  }

  const sideNavState = {
    isMobile, setIsMobile
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login setAuthStatus={setAuthStatus} signInGoogle={signInGoogle} />} />
        <Route path="signup" element={<SignUp signInGoogle={signInGoogle} />} />
        <Route element={<PrivateRoute auth={authStatus} />} >
          <Route path="/dashboard" element={
              <AuthContext.Provider value={signOutAccount}>
                <SideNavContext.Provider value={sideNavState} >
                  <Dashboard />
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

