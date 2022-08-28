import { useContext, createContext, useEffect, useState } from 'react'
import { signInWithRedirect, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { auth, provider } from '../config/firebase'

const AuthContext = createContext<any>(null)

export const AuthContextProvider = ({ children }: IContextProvider) => {
    
    const [user, setUser] = useState<User | {}>({})
    const [userProvider, setUserProvider] = useState('')
    const [userName, setUserName] = useState('')
    const [userUid, setUserUid] = useState('')

    let item: number

    useEffect(() => {
        const sub = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                setUserUid(currentUser.uid)
                currentUser.providerData.map((id) => {
                    setUserProvider(id.providerId)
                })
                if(currentUser.displayName) {
                    const username = currentUser.displayName.charAt(0).toUpperCase() + currentUser.displayName.substring(1)
                    setUserName(username)
                }
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
        <AuthContext.Provider value={{ signInGoogle, signOutAccount, user, userName, userUid, userProvider }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}