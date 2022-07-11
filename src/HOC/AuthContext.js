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

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    
    const [user, setUser] = useState({})

    useEffect(() => {
        const sub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => sub()
    }, [])

    const signInGoogle = () => {
        signInWithRedirect(auth, provider)
    }

    const signOutAccount = () => {
        signOut(auth) 
    }


    return (
        <AuthContext.Provider value={{ signInGoogle, signOutAccount, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}