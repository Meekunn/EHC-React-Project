/* eslint-disable */
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Typewriter from "typewriter-effect";
import { IoSchool, IoPersonSharp } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import Navbar from "../Navbar";
import SideNav from "../SideNav";
import { UserAuth } from "../../HOC/AuthContext";
import { collection, onSnapshot, query } from "firebase/firestore";
import "./dashboard.scss";
import useCreateCollection from "../../hooks/useCreateCollection";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { db } from "../../config/firebase";

const Dashboard = () => {
	const router = useNavigate();
	const { userName, user } = UserAuth();
	const { createCollection } = useCreateCollection();
	const [personalTotalTask, setPersonalTotalTask] = useState(0);
	const [personalDoneTask, setPersonalDoneTask] = useState(0);
	const [schoolTotalTask, setSchoolTotalTask] = useState(0);
	const [schoolDoneTask, setSchoolDoneTask] = useState(0);
	const [workTotalTask, setWorkTotalTask] = useState(0);
	const [workDoneTask, setWorkDoneTask] = useState(0);
	const [percentSchool, setPercentSchool] = useState(0);
	const [percentWork, setPercentWork] = useState(0);
	const [percentPersonal, setPercentPersonal] = useState(0);

	useEffect(() => {
		getCollectionDocs("school");
		getCollectionDocs("work");
		getCollectionDocs("personal");
	}, [user]);

	const percentConverter = (num: number, total: number): number => {
		let res: number = 0;
		if (num == 0 || total == 0) {
			console.log(res, "res");
			return res;
		}
		res = (num / total) * 100;
		console.log(res, "res");
		return res;
	};

	// const resSchool = useMemo(
	// 	() => percentConverter(schoolDoneTask, schoolTotalTask),
	// 	[schoolDoneTask, schoolTotalTask]
	// );

	// const resWork = useMemo(
	// 	() => percentConverter(workDoneTask, workTotalTask),
	// 	[workDoneTask, workTotalTask]
	// );

	// const resPersonal = useMemo(
	// 	() => percentConverter(personalDoneTask, personalTotalTask),
	// 	[personalDoneTask, personalTotalTask]
	// );

	const getCollectionDocs = (collectionName: string) => {
		const q = query(
			collection(db, `${collectionName}/${user.uid}/todoList`)
		);
		const unsub = onSnapshot(q, (querySnapshot: any) => {
			let items: any = [];
			let doneItems: any = [];
			if (collectionName === "school") {
				querySnapshot.docs.map((doc: any) => {
					const data = doc.data();
					items.push({ ...doc.data() });
					if (data.complete === true) {
						doneItems.push({ ...doc.data() });
					}
				});
				setSchoolTotalTask(items.length);
				setSchoolDoneTask(doneItems.length);
				// console.log(resSchool);
				//setPercentSchool(resSchool);
			} else if (collectionName === "work") {
				querySnapshot.docs.map((doc: any) => {
					const data = doc.data();
					items.push({ ...doc.data() });
					if (data.complete === true) {
						doneItems.push({ ...doc.data() });
					}
				});
				setWorkTotalTask(items.length);
				setWorkDoneTask(doneItems.length);
				//console.log(resWork);
				//setPercentWork(resWork);
			} else if (collectionName === "personal") {
				querySnapshot.docs.map((doc: any) => {
					const data = doc.data();
					items.push({ ...doc.data() });
					if (data.complete === true) {
						doneItems.push({ ...doc.data() });
					}
				});
				setPersonalTotalTask(items.length);
				setPersonalDoneTask(doneItems.length);
				//setPercentPersonal(resPersonal);
			}
			return () => unsub();
		});
	};

	const createEachCollection = (name: string) => {
		createCollection(name);
		router(`/dashboard/${name}`);
	};

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
						<button onClick={() => createEachCollection("school")}>
							<span
								className="icons"
								style={{ backgroundColor: "#F75F8C" }}
							>
								<IoSchool />
							</span>
							<div className="progress-label">
								<p>School</p>
								<CircularProgressbar
									value={
										(schoolDoneTask / schoolTotalTask) * 100
									}
									text={`${schoolDoneTask}/${schoolTotalTask}`}
									strokeWidth={13}
								/>
							</div>
						</button>
						<button
							onClick={() => createEachCollection("personal")}
						>
							<span
								className="icons"
								style={{ backgroundColor: "#33948D" }}
							>
								<IoPersonSharp />
							</span>
							<div className="progress-label">
								<p>Personal</p>
								<CircularProgressbar
									value={
										(personalDoneTask / personalTotalTask) *
										100
									}
									text={`${personalDoneTask}/${personalTotalTask}`}
									strokeWidth={13}
								/>
							</div>
						</button>
						<button onClick={() => createEachCollection("work")}>
							<span
								className="icons"
								style={{ backgroundColor: "#AC6089" }}
							>
								<MdWork />
							</span>
							<div className="progress-label">
								<p>Work</p>
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
	);
};
export default Dashboard;
