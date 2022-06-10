import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import './App.css'
import PrivateRoute from './HOC/PrivateRoute'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from './config/firebase'
import { signInWithPopup } from 'firebase/auth'

function App() {

  const [authStatus, setAuthStatus] = useState(false)
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

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login setAuthStatus={setAuthStatus} signInGoogle={signInGoogle} />} />
        <Route path="/signup" element={<SignUp signInGoogle={signInGoogle} />} />
        <Route element={<PrivateRoute auth={authStatus} />} >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
