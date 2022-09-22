import React, { useEffect, useState, useRef } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../config/firebase"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FiCheckCircle } from "react-icons/fi"
import { TiTimes } from "react-icons/ti"
import MainNavbar from "../MainNavbar"
import { UserAuth } from "../../HOC/AuthContext"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./auth.scss"
import Snackbar from "../Snackbar"

//CSS Styling on visibility icons
const visibilityIconStyle = {
	background: "transparent",
	color: "#DE2D66",
}

//REGEX EXPRESSIONS TO VALIDATE USER INPUT ✔
const USERNAME_REGEX = /^[A-Z][a-z_]{3,23}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const USEREMAIL_REGEX = /^[A-Za-z0-9_\-.]{4,}[@][a-z]+[.][a-z]{2,3}$/

const SignUp = () => {
	const router = useNavigate()
	const { signOutAccount } = UserAuth()
	const userRef = useRef<HTMLInputElement>(null)

	const [username, setUsername] = useState("")
	const [validName, setValidName] = useState(false)
	const [focusName, setFocusName] = useState(false)

	const [email, setEmail] = useState("")
	const [validEmail, setValidEmail] = useState(false)
	const [focusEmail, setFocusEmail] = useState(false)

	const [password, setPassword] = useState("")
	const [validPass, setValidPass] = useState(false)
	const [focusPass, setFocusPass] = useState(false)

	const [confirmPass, setConfirmPass] = useState("")
	const [validConfirmPass, setValidConfirmPass] = useState(false)
	const [focusConfirmPass, setFocusConfirmPass] = useState(false)

	const [showPass, setShowPass] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)

	//Set Focus on First Input onComponentDidMount ⌨
	useEffect(() => {
		userRef.current?.focus()
	}, [])

	//Validate User input value for Username 🔠
	useEffect(() => {
		setValidName(USERNAME_REGEX.test(username))
	}, [username])

	//Validate User input value for Email 🔠
	useEffect(() => {
		setValidEmail(USEREMAIL_REGEX.test(email))
	}, [email])

	//Validate User input value for Password and Confirm Passwords🔠
	useEffect(() => {
		setValidPass(PASSWORD_REGEX.test(password))
		setValidConfirmPass(password === confirmPass)
	}, [password, confirmPass])

	const signUpEmail = () => {
		const entry1 = USERNAME_REGEX.test(username)
		const entry2 = USEREMAIL_REGEX.test(email)
		const entry3 = PASSWORD_REGEX.test(password)

		//Enforce validate before Submission
		if (!entry1 || !entry2 || !entry3) {
			toast.warn("Don't Play Smart 🤡")
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then(async () => {
					if (auth.currentUser) {
						await updateProfile(auth.currentUser, {
							displayName: username,
						})
						setUsername("")
						setPassword("")
						setEmail("")
						setConfirmPass("")
						await signOutAccount()
						router("/login")
					}
				})
				.catch((error) => {
					if (error.code === "auth/weak-password") {
						toast.error("Please enter a strong password")
					} else if (error.code === "auth/email-already-in-use") {
						toast.error("Email is already in use")
					} else {
						toast.error("Unable to Sign Up. Try again later.")
					}
				})
		}
	}

	return (
		<>
			<MainNavbar />
			<div className="auth-wrapper">
				<Snackbar
					focusValue={focusName}
					value={username}
					validValue={validName}
					info1={"4 to 24 characters."}
					info2={"Only letters and underscores allowed."}
				/>
				<Snackbar
					focusValue={focusEmail}
					value={email}
					validValue={validEmail}
					info1={"Invalid Email"}
				/>
				<Snackbar
					focusValue={focusPass}
					value={password}
					validValue={validPass}
					info1={"8 to 24 characters."}
					info2={
						"Must include uppercase and lowercase letters, a number and a special character."
					}
					info3={"Allowed Characters: !@#$%"}
				/>
				<Snackbar
					focusValue={focusConfirmPass}
					value={confirmPass}
					validValue={validConfirmPass}
					info1={"Must match the first password input field."}
				/>
				<ToastContainer position="bottom-left" style={{ width: "70%", margin: "1rem" }} />
				<div className="auth-container">
					<div className="auth-form-wrapper">
						<h1> Sign Up </h1>
						<div className="auth-form">
							<div className="input-group">
								<label htmlFor="username">
									Username:
									<FiCheckCircle className={validName ? "valid" : "hide"} />
									<TiTimes
										className={validName || !username ? "hide" : "invalid"}
									/>
								</label>
								<div className="input-with-icon">
									<input
										ref={userRef}
										required
										id="username"
										type="text"
										autoComplete="off"
										placeholder="Jane Doe"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										onFocus={() => setFocusName(true)}
										onBlur={() => setFocusName(false)}
									/>
								</div>
							</div>
							<div className="input-group">
								<label htmlFor="email">
									Email:
									<FiCheckCircle className={validEmail ? "valid" : "hide"} />
									<TiTimes
										className={validEmail || !email ? "hide" : "invalid"}
									/>
								</label>
								<div className="input-with-icon">
									<input
										required
										id="email"
										type="email"
										placeholder="janedoe@email.com"
										autoComplete="off"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										onFocus={() => setFocusEmail(true)}
										onBlur={() => setFocusEmail(false)}
									/>
								</div>
							</div>
							<div className="input-group">
								<label htmlFor="password">
									Password:
									<FiCheckCircle className={validPass ? "valid" : "hide"} />
									<TiTimes
										className={validPass || !password ? "hide" : "invalid"}
									/>
								</label>
								<div className="input-with-icon">
									<input
										required
										id="password"
										type={showPass ? "text" : "password"}
										autoComplete="off"
										placeholder="********"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										onFocus={() => setFocusPass(true)}
										onBlur={() => setFocusPass(false)}
									/>
									<button onClick={() => setShowPass(!showPass)}>
										{showPass ? (
											<MdVisibilityOff style={visibilityIconStyle} />
										) : (
											<MdVisibility style={visibilityIconStyle} />
										)}
									</button>
								</div>
							</div>
							<div className="input-group">
								<label htmlFor="confirm">
									Confirm Password:
									<FiCheckCircle
										className={
											validConfirmPass && confirmPass ? "valid" : "hide"
										}
									/>
									<TiTimes
										className={
											validConfirmPass || !confirmPass ? "hide" : "invalid"
										}
									/>
								</label>
								<div className="input-with-icon">
									<input
										required
										id="confirm"
										type={showConfirm ? "text" : "password"}
										placeholder="********"
										autoComplete="off"
										value={confirmPass}
										onChange={(e) => setConfirmPass(e.target.value)}
										onFocus={() => setFocusConfirmPass(true)}
										onBlur={() => setFocusConfirmPass(false)}
									/>
									<button onClick={() => setShowConfirm(!showConfirm)}>
										{showConfirm ? (
											<MdVisibilityOff style={visibilityIconStyle} />
										) : (
											<MdVisibility style={visibilityIconStyle} />
										)}
									</button>
								</div>
							</div>
							<button
								className="auth-btn"
								onClick={signUpEmail}
								disabled={
									!validName || !validEmail || !validPass || !validConfirmPass
										? true
										: false
								}
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignUp
