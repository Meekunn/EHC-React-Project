import { Routes, Route } from "react-router-dom"
import Login from "./components/Auth/Login"
import SignUp from "./components/Auth/SignUp"
import Dashboard from "./components/Dashboard"
import School from "./components/Collections/School"
import Personal from "./components/Collections/Personal"
import Work from "./components/Collections/Work"
import PrivateRoute from "./HOC/PrivateRoute"
import { AuthContextProvider } from "./HOC/AuthContext"
import { SidenavContextProvider } from "./HOC/SidenavContext"
import { CollectionNameProvider } from "./HOC/CollectionNameContext"
import LandingPage from "./components/LandingPage"
import "./App.scss"

function App() {
	return (
		<div className="App">
			<AuthContextProvider>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="signup" element={<SignUp />} />
					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<SidenavContextProvider>
									<CollectionNameProvider>
										<Dashboard />
									</CollectionNameProvider>
								</SidenavContextProvider>
							</PrivateRoute>
						}
					/>
					<Route
						path="/dashboard/school"
						element={
							<PrivateRoute>
								<SidenavContextProvider>
									<CollectionNameProvider>
										<School />
									</CollectionNameProvider>
								</SidenavContextProvider>
							</PrivateRoute>
						}
					/>
					<Route
						path="/dashboard/personal"
						element={
							<PrivateRoute>
								<SidenavContextProvider>
									<CollectionNameProvider>
										<Personal />
									</CollectionNameProvider>
								</SidenavContextProvider>
							</PrivateRoute>
						}
					/>
					<Route
						path="/dashboard/work"
						element={
							<PrivateRoute>
								<SidenavContextProvider>
									<CollectionNameProvider>
										<Work />
									</CollectionNameProvider>
								</SidenavContextProvider>
							</PrivateRoute>
						}
					/>
				</Routes>
			</AuthContextProvider>
		</div>
	)
}

export default App
