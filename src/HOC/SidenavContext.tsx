/* eslint-disable */
import { useContext, createContext, useState } from 'react'

const SidenavContext = createContext<any>(null)

export const SidenavContextProvider = ({children}: IContextProvider) => {

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