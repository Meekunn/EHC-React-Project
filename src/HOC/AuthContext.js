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
    const [userName, setUserName] = useState('')
    const [userUid, setUserUid] = useState('')

    useEffect(() => {
        const sub = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser){
                console.log(currentUser)
                setUser(currentUser)
                const username = currentUser.displayName.charAt(0).toUpperCase() + currentUser.displayName.substring(1)
                setUserName(username)
                setUserUid(currentUser.uid)
            }
        })
        return () => sub()
    }, [])

    const signInGoogle = () => {
        signInWithRedirect(auth, provider)
    }

    const signOutAccount = () => {
        signOut(auth)
        .then(() => {
            console.log('sign Out')
        })
    }


    return (
        <AuthContext.Provider value={{ signInGoogle, signOutAccount, user, userName, userUid }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}