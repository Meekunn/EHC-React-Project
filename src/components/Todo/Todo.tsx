import { useEffect, useState } from "react"
import { MdModeEdit, MdCloudDone, MdDoneAll } from "react-icons/md"
import { BsCalendarEvent } from "react-icons/bs"
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdOutlineCoffeeMaker } from "react-icons/md"
import { TbTrash } from "react-icons/tb"
import { ITodo } from "../../types"
import "./todo.scss"

const Todo = ({ task, toggleTodo, editTodo, editDueDate, deleteTodo }: ITodo) => {
	let duedate: string
	let duetime: string
	const [todoEdit, setTodoEdit] = useState(`${task.todo}`)
	const [edit, setEdit] = useState(false)
	const [isShow, setIsShow] = useState(false)
	const [isEditDate, setIsEditDate] = useState(false)
	const [createdTime, setCreatedTime] = useState("")
	const [scheduledTime, setScheduledTime] = useState(`${task.dueTime}, ${task.dueDate}`)
	const [inputDate, setInputDate] = useState(task.dueDate)
	const [inputTime, setInputTime] = useState(task.dueTime)

	useEffect(() => {
		const timestamp = new Date(task.time.seconds * 1000)
		const hour = timestamp.getHours().toString()
		const minute = timestamp.getMinutes().toString()
		const date = timestamp.toDateString()
		setCreatedTime(`${hour}: ${minute}, ${date}`)
	}, [])

	const handleEditTodo = () => {
		editTodo(task.id, todoEdit)
		setEdit(false)
	}

	const handleEditDate = () => {
		const date = new Date(`${inputDate}, ${inputTime}`)
		duedate = date.toDateString()
		duetime = `${date.getHours().toString()}: ${date.getMinutes().toString()}`
		setScheduledTime(`${duetime}, ${duedate}`)
		editDueDate(task.id, duedate, duetime)
		setIsEditDate(false)
	}

	return (
		<div id={task.id} className="todo-wrapper">
			<div className="todo-content">
				<div className="content">
					<button onClick={() => toggleTodo(task.id, !task.complete)} className="uncheck">
						<span className="checkmark"></span>
					</button>
					{edit ? (
						<input
							className="input"
							value={todoEdit}
							onChange={(e) => setTodoEdit(e.target.value)}
						/>
					) : (
						<span className="task">{todoEdit}</span>
					)}
				</div>
				<div className="btns">
					{edit ? (
						<button onClick={handleEditTodo} className="todo-btns">
							<MdCloudDone />
						</button>
					) : (
						<button className="edit todo-btns" onClick={() => setEdit(true)}>
							<MdModeEdit />
						</button>
					)}
					<button
						className="todo-btns"
						onClick={() => {
							deleteTodo(task.id)
						}}
					>
						<TbTrash />
					</button>
					{isShow ? (
						<button className="todo-btns" onClick={() => setIsShow(!isShow)}>
							<MdKeyboardArrowUp />
						</button>
					) : (
						<button className="todo-btns" onClick={() => setIsShow(!isShow)}>
							<MdKeyboardArrowDown />
						</button>
					)}
				</div>
			</div>
			<div className={isShow ? "todo-details" : "todo-details hide-details"}>
				<div className="dates created-at">
					<BsCalendarEvent color="#AC6089" />
					<p className="date">{createdTime}</p>
				</div>
				<div className="dates due-at">
					{isEditDate ? (
						<>
							<button onClick={handleEditDate} className="edit_due_date_btn">
								<MdDoneAll color="#33948D" />
							</button>
							<input
								className="edit_due_date"
								required
								type="date"
								value={inputDate}
								onChange={(e) => setInputDate(e.target.value)}
							/>
							<input
								className="edit_due_date"
								required
								type="time"
								value={inputTime}
								onChange={(e) => setInputTime(e.target.value)}
							/>
						</>
					) : (
						<>
							<button
								onClick={() => setIsEditDate(true)}
								className="edit_due_date_btn"
							>
								<MdOutlineCoffeeMaker color="#33948D" />
							</button>
							<p className="date">{scheduledTime}</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Todo
