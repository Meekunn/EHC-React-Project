import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FcGoogle } from "react-icons/fc"
import { signInWithEmailAndPassword, getRedirectResult } from "firebase/auth"
import { ToastContainer, toast } from "react-toastify"
import { auth } from "../../config/firebase"
import Spinner from "../Spinner"
import MainNavbar from "../MainNavbar"
import { UserAuth } from "../../HOC/AuthContext"
import "react-toastify/dist/ReactToastify.css"
import "./auth.scss"

const visibilityIconStyle = {
	background: "transparent",
	color: "#DE2D66",
}

const Login = () => {
	//Values from AuthContextProvider
	const { signInGoogle, user, userProvider } = UserAuth()

	const router = useNavigate()
	const userRef = useRef<HTMLInputElement>(null)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [show, setShow] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		//Check if User exists
		if (user) {
			if (userProvider === "google.com") {
				setIsLoading(true)
				//Get Auth Redirect Result
				getRedirectResult(auth).then(() => {
					router("/dashboard")
					setIsLoading(false)
				})
			}
		} else {
			router("/login")
		}
	}, [user])

	//Focus on First input on Component mount
	useEffect(() => {
		userRef.current?.focus()
	}, [])

	const signInEmail = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				router("/dashboard")
			})
			.catch((error) => {
				if (error.code === "auth/wrong-password") {
					toast.error("Invalid Password")
				} else if (error.code === "auth/user-not-found") {
					toast.error("Invalid Email")
				} else if (error.code === "auth/user-disabled") {
					toast.error("Account disabled")
				} else {
					toast.error("Unable to Login. Try again later.")
				}
			})
	}

	const handleSignInGoogle = async () => {
		try {
			await signInGoogle()
		} catch (err) {
			toast.error("Unable to Login. Try again later.")
		}
	}

	return (
		<>
			<MainNavbar />
			<div className="auth-wrapper">
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<ToastContainer
							position="bottom-left"
							style={{ width: "70%", margin: "1rem" }}
						/>
						<div className="auth-container">
							<div className="auth-form-wrapper">
								<h1> Login </h1>
								<div className="auth-form">
									<div className="input-group">
										<label htmlFor="email">Email: </label>
										<div className="input-with-icon">
											<input
												type="email"
												ref={userRef}
												required
												placeholder="janedoe@email.com"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
									</div>
									<div className="input-group">
										<label htmlFor="password">Password: </label>
										<div className="input-with-icon">
											<input
												type={show ? "text" : "password"}
												required
												placeholder="Enter password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
											<button onClick={() => setShow(!show)}>
												{show ? (
													<MdVisibilityOff style={visibilityIconStyle} />
												) : (
													<MdVisibility style={visibilityIconStyle} />
												)}
											</button>
										</div>
									</div>
									<button
										className="auth-btn"
										onClick={signInEmail}
										disabled={!email || !password ? true : false}
									>
										Login
									</button>
									<p className="or">OR</p>
									<button className="google-btn" onClick={handleSignInGoogle}>
										Continue with Google <FcGoogle />
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	)
}

export default Login
