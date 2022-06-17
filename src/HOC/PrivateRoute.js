import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = ({ auth }) => {
    return auth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute