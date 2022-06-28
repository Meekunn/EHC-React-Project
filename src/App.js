import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import SchoolCollection from './components/Collections/SchoolCollection'
import PrivateRoute from './HOC/PrivateRoute'
import { auth, provider, db } from './config/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import './App.css'


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

  const signOutAccount = () => {
    signOut(auth)
    .then(() => {
      setAuthStatus(false)
      router('/login')
    }).catch((error) => {
      console.log('logged out', error)
    });
  }


  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login setAuthStatus={setAuthStatus} signInGoogle={signInGoogle} />} />
        <Route path="/signup" element={<SignUp signInGoogle={signInGoogle} />} />
        <Route element={<PrivateRoute auth={authStatus} />} >
          <Route path="/dashboard" element={<Dashboard signOutAccount={signOutAccount} />} />
          <Route path="/dashboard/school" element={<SchoolCollection />} />
        </Route>
        {/* <Route path="/dashboard" element={<Dashboard signOutAccount={signOutAccount} />} />
        <Route path="/dashboard/school" element={<SchoolCollection />} /> */}
      </Routes>
    </div>
  )
}

export default App

export const deleteTodo = async (id) => {
  const user = auth.currentUser
  if (user !== null ){
      //fetches the user's uid
      const uid = user.uid
      const docRef = doc(db, `/school/${uid}/todoList`, id)
      await deleteDoc(docRef)
      console.log('deleted')
  }
}
