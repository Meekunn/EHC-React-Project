import { 
    useContext, 
    createContext, 
    useEffect, 
    useState 
} from 'react'
import { 
    signInWithRedirect,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth, provider } from '../config/firebase'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    
    const router = useNavigate()
    const [user, setUser] = useState({})

    useEffect(() => {
        const sub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('User', currentUser)
        })
        return () => sub()
    }, [])

    const signInGoogle = () => {
        signInWithRedirect(auth, provider)
    }

    const signOutAccount = () => {
        signOut(auth)
        .then(() => {
            router('/login')
            console.log('signout')
        })
        .catch((err) => {
            console.log(err)
        })
    }


    return (
        <AuthContext.Provider value={{ signInGoogle, signOutAccount, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}