import { useNavigate } from "react-router-dom"
import { IoSchool, IoPersonAddSharp } from "react-icons/io5"
import { MdWork } from "react-icons/md"
import { UseSideNav } from "../../HOC/SidenavContext"
import "./sidenav.scss"

const SideNav = () => {
	const { isMobile, setIsMobile } = UseSideNav()
	const router = useNavigate()

	return (
		<div className={isMobile ? "sidenav-wrapper mobile" : "sidenav-wrapper"}>
			<div className="sidenav-container">
				<h2>Collections</h2>
				<div className="sidenav-links">
					<button
						className="sidenav-btn"
						onClick={() => {
							router("/dashboard/school")
							setIsMobile(false)
						}}
					>
						<span
							style={{
								backgroundColor: "#F7578C",
							}}
						>
							<IoSchool />
						</span>
						School
					</button>
					<button
						className="sidenav-btn"
						onClick={() => {
							router("/dashboard/personal")
							setIsMobile(false)
						}}
					>
						<span
							style={{
								backgroundColor: "#33948D",
							}}
						>
							<IoPersonAddSharp />
						</span>
						Personal
					</button>
					<button
						className="sidenav-btn"
						onClick={() => {
							router("/dashboard/work")
							setIsMobile(false)
						}}
					>
						<span
							style={{
								backgroundColor: "#AC4089",
							}}
						>
							<MdWork />
						</span>
						Work
					</button>
				</div>
			</div>
		</div>
	)
}

export default SideNav
