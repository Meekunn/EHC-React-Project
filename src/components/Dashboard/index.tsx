/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Typewriter from "typewriter-effect"
import { IoSchool, IoPersonSharp } from "react-icons/io5"
import { MdWork } from "react-icons/md"
import Navbar from "../Navbar"
import SideNav from "../SideNav"
import { UserAuth } from "../../HOC/AuthContext"
import { UseCollectionName } from "../../HOC/CollectionNameContext"
import { collection, onSnapshot, query } from "firebase/firestore"
import "./dashboard.scss"
import useCreateCollection from "../../hooks/useCreateCollection"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { db } from "../../config/firebase"

const Dashboard = () => {
	const router = useNavigate()
	const { userName, user } = UserAuth()
	const { schoolColName, workColName, personalColName } = UseCollectionName()
	const { createCollection } = useCreateCollection()
	const [personalTotalTask, setPersonalTotalTask] = useState(0)
	const [personalDoneTask, setPersonalDoneTask] = useState(0)
	const [schoolTotalTask, setSchoolTotalTask] = useState(0)
	const [schoolDoneTask, setSchoolDoneTask] = useState(0)
	const [workTotalTask, setWorkTotalTask] = useState(0)
	const [workDoneTask, setWorkDoneTask] = useState(0)

	useEffect(() => {
		getCollectionDocs("school")
		getCollectionDocs("work")
		getCollectionDocs("personal")
	}, [user])

	const getCollectionDocs = (collectionName: string) => {
		const q = query(collection(db, `${collectionName}/${user.uid}/todoList`))
		const unsub = onSnapshot(q, (querySnapshot: any) => {
			const items: any = []
			const doneItems: any = []
			if (collectionName === "school") {
				querySnapshot.docs.map((doc: any) => {
					const data = doc.data()
					items.push({ ...doc.data() })
					if (data.complete === true) {
						doneItems.push({ ...doc.data() })
					}
				})
				setSchoolTotalTask(items.length)
				setSchoolDoneTask(doneItems.length)
			} else if (collectionName === "work") {
				querySnapshot.docs.map((doc: any) => {
					const data = doc.data()
					items.push({ ...doc.data() })
					if (data.complete === true) {
						doneItems.push({ ...doc.data() })
					}
				})
				setWorkTotalTask(items.length)
				setWorkDoneTask(doneItems.length)
			} else if (collectionName === "personal") {
				querySnapshot.docs.map((doc: any) => {
					const data = doc.data()
					items.push({ ...doc.data() })
					if (data.complete === true) {
						doneItems.push({ ...doc.data() })
					}
				})
				setPersonalTotalTask(items.length)
				setPersonalDoneTask(doneItems.length)
			}
			return () => unsub()
		})
	}

	const createEachCollection = (name: string) => {
		createCollection(name)
		router(`/dashboard/${name}`)
	}

	return (
		<>
			<Navbar />
			<div className="dash-wrapper">
				<SideNav />
				<div className="dash-container">
					<div className="typewriter">
						<Typewriter
							options={{
								strings: [
									`Welcome Back  ${userName}`,
									"Wanna Tick Off Something Today?",
								],
								autoStart: true,
								loop: true,
								delay: 100,
								deleteSpeed: 50,
								cursorClassName: "cursor",
							}}
						/>
					</div>
					<div className="btns-wrapper">
						<button onClick={() => createEachCollection("school")} className="col-btn">
							<div className="icons-wrapper">
								<span className="icons" style={{ backgroundColor: "#F75F8C" }}>
									<IoSchool />
								</span>
							</div>
							<div className="progress-label">
								<p>{schoolColName}</p>
								<CircularProgressbar
									value={(schoolDoneTask / schoolTotalTask) * 100}
									text={`${schoolDoneTask}/${schoolTotalTask}`}
									strokeWidth={13}
								/>
							</div>
						</button>
						<button
							onClick={() => createEachCollection("personal")}
							className="col-btn"
						>
							<div className="icons-wrapper">
								<span className="icons" style={{ backgroundColor: "#33948D" }}>
									<IoPersonSharp />
								</span>
							</div>
							<div className="progress-label">
								<p>{personalColName}</p>
								<CircularProgressbar
									value={(personalDoneTask / personalTotalTask) * 100}
									text={`${personalDoneTask}/${personalTotalTask}`}
									strokeWidth={13}
								/>
							</div>
						</button>
						<button onClick={() => createEachCollection("work")} className="col-btn">
							<div className="icons-wrapper">
								<span className="icons" style={{ backgroundColor: "#AC6089" }}>
									<MdWork />
								</span>
							</div>
							<div className="progress-label">
								<p>{workColName}</p>
								<CircularProgressbar
									value={(workDoneTask / workTotalTask) * 100}
									text={`${workDoneTask}/${workTotalTask}`}
									strokeWidth={13}
								/>
							</div>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
export default Dashboard
