import { useNavigate } from "react-router-dom"
import MainNavbar from "../MainNavbar"
import "./landingpage.scss"
const LandingPage = () => {
	const router = useNavigate()

	const getStarted = () => {
		router("/signup")
	}

	return (
		<>
			<MainNavbar />
			<div className="page-wrapper">
				<div className="page-container">
					<div className="bubble-wrapper">
						<div>
							<span className="dot"></span>
						</div>
						<div>
							<span className="dot"></span>
						</div>
						<div>
							<span className="dot"></span>
						</div>
						<div>
							<span className="dot"></span>
						</div>
						<div>
							<span className="dot"></span>
						</div>
					</div>
					<div className="content-wrapper">
						<h1 className="title">Tsks, just tasks</h1>
						<p className="about">
							Keep track of your daily tasks and get that satisfaction upon completion
						</p>
						<button className="get-started" onClick={getStarted}>
							Get Started
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default LandingPage
