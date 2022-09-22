/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom"
import { UserAuth } from "./AuthContext"

const PrivateRoute = ({ children }: any) => {
	const { user } = UserAuth()

	if (!user) {
		return <Navigate to="/" />
	}

	return children
}

export default PrivateRoute
