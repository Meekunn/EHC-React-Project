import { Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from './AuthContext'

const PrivateRoute = ({children}) => {
    //return auth ? <Outlet /> : <Navigate to='/login' />
    const { user } = UserAuth()
    if (!user) {
        return <Navigate to='/login' />
    }

    return children
}

export default PrivateRoute

