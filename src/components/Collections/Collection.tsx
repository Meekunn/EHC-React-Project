/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import {
	collection,
	doc,
	query,
	onSnapshot,
	orderBy,
	setDoc,
	deleteDoc,
	serverTimestamp,
} from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { db } from "../../config/firebase"
import { UserAuth } from "../../HOC/AuthContext"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md"
import Navbar from "../Navbar"
import SideNav from "../SideNav"
import Todo from "../Todo/Todo"
import TodoForm from "../TodoForm"
import CompletedTodo from "../Todo/CompletedTodo"
import useAddTodo from "../../hooks/useAddTodo"
import { ITasks } from "../../types/index"
import LinearProgress from "../LinearProgress"
import { AiTwotoneEdit } from "react-icons/ai"
import EditCollectionName from "./EditCollectionName"
import { UseCollectionName } from "../../HOC/CollectionNameContext"
import "./collection.scss"
import DueDate from "../TodoForm/DueDate"

function addDays(numOfDays: number) {
	const dateCopy = new Date()

	dateCopy.setDate(dateCopy.getDate() + numOfDays)

	return dateCopy
}

const Collection = ({ collectionName }: ICollectionName) => {
	const router = useNavigate()
	const { add } = useAddTodo()
	const { user } = UserAuth()
	const {
		setIsOpen,
		schoolColName,
		setSchoolColName,
		workColName,
		setWorkColName,
		personalColName,
		setPersonalColName,
	} = UseCollectionName()
	const date = addDays(5)
	const defaultDueDate = date.toDateString()
	const defaultDueTime = date.getHours().toString() + ": " + date.getMinutes().toString()

	const [todo, setTodo] = useState("")
	const [completedTasks, setCompletedTasks] = useState<ITasks[]>([])
	const [uncompletedTasks, setUncompletedTasks] = useState<ITasks[]>([])
	const [loading, setLoading] = useState(true)
	const [isAdding, setIsAdding] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [isToggling, setIsToggling] = useState(false)
	const [isDueDate, setIsDueDate] = useState(false)
	const [dueTime, setDueTime] = useState(defaultDueTime)
	const [dueDate, setDueDate] = useState(defaultDueDate)

	useEffect(() => {
		const q = query(
			collection(db, `${collectionName}/${user.uid}/todoList`),
			orderBy("time", "desc")
		)
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setLoading(false)
			querySnapshot.docs.map((doc) => {
				const data = doc.data()
				if (data.complete === false && data.time != null) {
					return setUncompletedTasks((prevTasks: any) => {
						const itExists = prevTasks.find(
							(task: { id: string }) => task.id === doc.id
						)
						if (itExists) return prevTasks
						const items = [...prevTasks, { ...doc.data(), id: doc.id }]
						const sortedItems = items.sort((x, y) => {
							return y.time - x.time
						})
						return sortedItems
					})
				} else if (data.complete === true && data.time != null) {
					return setCompletedTasks((prevTasks: any) => {
						const itExists = prevTasks.find(
							(task: { id: string }) => task.id === doc.id
						)
						if (itExists) return prevTasks
						const items = [...prevTasks, { ...doc.data(), id: doc.id }]
						const sortedItems = items.sort((x, y) => {
							return y.time - x.time
						})
						return sortedItems
					})
				}
			})
		})
		return () => {
			unsubscribe()
		}
	}, [user])

	const capitalizeName = (colName: string): string => {
		let newName = ""
		if (colName === "school") {
			newName = schoolColName.charAt(0).toUpperCase() + schoolColName.substring(1)
			setSchoolColName(newName)
		} else if (colName === "work") {
			newName = workColName.charAt(0).toUpperCase() + workColName.substring(1)
			setWorkColName(newName)
		} else if (colName === "personal") {
			newName = personalColName.charAt(0).toUpperCase() + personalColName.substring(1)
			setPersonalColName(newName)
		}
		return newName
	}
	const capitalizeCollectionName = capitalizeName(collectionName)

	const addTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		add(todo, collectionName, dueTime, dueDate, setIsAdding)
		setTodo("")
	}

	const toggleTodo = async (id: string, complete: boolean) => {
		setIsToggling(true)
		const todoRef = doc(db, `${collectionName}/${user.uid}/todoList/${id}`)
		try {
			await setDoc(
				todoRef,
				{
					complete,
					time: serverTimestamp(),
				},
				{ merge: true }
			)
			if (complete) {
				setUncompletedTasks((prevTasks) => {
					const newArray = prevTasks.filter((task: ITasks) => task.id !== id)
					return [...newArray]
				})
			} else {
				setCompletedTasks((prevTasks) => {
					const newArray = prevTasks.filter((task: ITasks) => task.id !== id)
					return [...newArray]
				})
			}
			setIsToggling(false)
		} catch (error: any) {
			setIsToggling(false)
			return error
		}
	}

	const editTodo = async (id: string, todo: string) => {
		const todoRef = doc(db, `${collectionName}/${user.uid}/todoList/${id}`)
		await setDoc(
			todoRef,
			{
				todo: todo,
				time: serverTimestamp(),
			},
			{ merge: true }
		)
	}

	const editDueDate = async (id: string, dueDate: string, dueTime: string) => {
		const todoRef = doc(db, `${collectionName}/${user.uid}/todoList/${id}`)
		await setDoc(
			todoRef,
			{
				dueTime,
				dueDate,
			},
			{ merge: true }
		)
		console.log(dueDate, dueTime)
	}

	const deleteTodo = async (id: string) => {
		setIsDeleting(true)
		const deleteRef = doc(db, `${collectionName}/${user.uid}/todoList`, id)
		try {
			await deleteDoc(deleteRef)
			setUncompletedTasks((prevTasks) => {
				const newArray = prevTasks.filter((task) => task.id !== id)
				return [...newArray]
			})
			setCompletedTasks((prevTasks) => {
				const newArray = prevTasks.filter((task) => task.id !== id)
				return [...newArray]
			})
			setIsDeleting(false)
		} catch (error: any) {
			setIsDeleting(false)
			return error
		}
	}

	return (
		<main>
			<Navbar />
			<div className="todos-wrapper">
				<SideNav />
				<EditCollectionName collectionName={collectionName} />
				{isDueDate && (
					<DueDate
						{...{ isDueDate, setIsDueDate, dueDate, setDueDate, dueTime, setDueTime }}
					/>
				)}
				{isAdding ? <LinearProgress bgColor="#F75F8C" label="Adding Task" /> : <></>}
				{isDeleting ? <LinearProgress bgColor="#F75F8C" label="Deleting Task" /> : <></>}
				{isToggling ? <LinearProgress bgColor="#F75F8C" label="Toggling" /> : <></>}
				{loading ? (
					<>
						<LinearProgress bgColor="#F75F8C" label="Loading" />
						<div className="todolist">
							<div className="wrapper">
								<div className="heading">
									<span>
										<button
											className="back-arrow"
											onClick={() => {
												router("/dashboard")
											}}
										>
											<MdOutlineKeyboardArrowLeft />
										</button>
										{capitalizeCollectionName}
									</span>
									<span className="three-dots">...</span>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="todolist">
						<div className="wrapper">
							<div className="heading">
								<span>
									<button
										className="back-arrow"
										onClick={() => {
											router("/dashboard")
										}}
									>
										<MdOutlineKeyboardArrowLeft />
									</button>
									{capitalizeCollectionName}
								</span>
								<button className="edit-icon" onClick={() => setIsOpen(true)}>
									<AiTwotoneEdit />
								</button>
							</div>
							<TodoForm {...{ addTodo, todo, setTodo, setIsDueDate }} />
							<div className="tasks-container">
								<p>Tasks - {uncompletedTasks.length} </p>
								<div className="tasks-wrapper">
									{uncompletedTasks.map((task: ITasks) => {
										return (
											<Todo
												key={task.id}
												{...{
													task,
													toggleTodo,
													editTodo,
													deleteTodo,
													editDueDate,
												}}
											/>
										)
									})}
								</div>
							</div>
							<div className="tasks-container">
								<p>Completed - {completedTasks.length} </p>
								<div className="tasks-wrapper">
									{completedTasks.map((task: ITasks) => {
										return (
											<CompletedTodo
												key={task.id}
												{...{ task, toggleTodo, deleteTodo }}
											/>
										)
									})}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}

export default Collection
