import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const GoogleAuth = () => {

    const router = useNavigate()

    const signInGoogle = () => {
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

    return {
        signInGoogle
    }
}

export default GoogleAuth