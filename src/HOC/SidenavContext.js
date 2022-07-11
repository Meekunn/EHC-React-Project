import { useContext, createContext, useState } from 'react'

const SidenavContext = createContext()

export const SidenavContextProvider = ({children}) => {

    const [isMobile, setIsMobile ] = useState(false)
    
    return (
        <SidenavContext.Provider value={{isMobile, setIsMobile}}>
            {children}
        </SidenavContext.Provider>
    )
}

export const UseSideNav = () => {
    return useContext(SidenavContext)
}