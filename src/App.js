import { useState, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import School from './components/Collections/School'
import Personal from './components/Collections/Personal'
import Work from './components/Collections/Work'
import PrivateRoute from './HOC/PrivateRoute'
import { AuthContextProvider, UserAuth } from './HOC/AuthContext'
import './App.css'

export const SideNavContext = createContext()
export const SnackbarContext = createContext()

function App() {
  
  const [isMobile, setIsMobile] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useNavigate()
  //const { authStatus } = UserAuth()

  // const signInGoogle = () => {  
  //   signInWithPopup(auth, provider)
  //   .then(() => {
  //     setAuthStatus(true) 
  //     setSuccess(true)
  //     router('/dashboard')
  //   })
  //   .catch(error => {
  //       console.log(error.code, error.message)
  //   })
  // }

  // const signInGoogle = () => {  
  //   signInWithRedirect(auth, provider)
  //   .then(() => {
  //     setAuthStatus(true) 
  //     setSuccess(true)
  //     router('/dashboard')
  //   })
  //   .catch(error => {
  //       console.log(error.code, error.message)
  //   })
  // }

  // const signOutAccount = () => {
  //   signOut(auth)
  //   .then(() => {
  //     setAuthStatus(false)
  //     router('/login')
  //   }).catch((err) => {
  //   });
  // }

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
      <AuthContextProvider>
        <Routes>
          <Route path="/login" 
            element={
              <SnackbarContext.Provider value={snackbarValues}>
                <Login />
              </SnackbarContext.Provider>
            } 
          />
          <Route path="signup" 
            element={
              <SnackbarContext.Provider value={snackbarValues}>
                <SignUp />
              </SnackbarContext.Provider>
            }
          />
          <Route 
            path="/dashboard"
            element={
              <PrivateRoute>
                <SideNavContext.Provider value={sideNavState} >
                    <SnackbarContext.Provider value={snackbarValues} >
                      <Dashboard />
                    </SnackbarContext.Provider>
                  </SideNavContext.Provider>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/school" 
            element={
              <PrivateRoute>
                <SideNavContext.Provider value={sideNavState} >
                  <School />
                </SideNavContext.Provider>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/personal" 
            element={
              <PrivateRoute>
                <SideNavContext.Provider value={sideNavState} >
                  <Personal />
                </SideNavContext.Provider>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/dashboard/work" 
            element={
              <PrivateRoute>
                <SideNavContext.Provider value={sideNavState} >
                  <Work />
                </SideNavContext.Provider>
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App

