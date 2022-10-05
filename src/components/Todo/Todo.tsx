import { useEffect, useState } from "react"
import { MdModeEdit, MdCloudDone } from "react-icons/md"
import { BsCalendarEvent } from "react-icons/bs"
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdOutlineCoffeeMaker } from "react-icons/md"
import { TbTrash } from "react-icons/tb"
import { ITodo } from "../../types"
import "./todo.scss"

const Todo = ({ task, toggleTodo, editTodo, deleteTodo }: ITodo) => {
	const [todoEdit, setTodoEdit] = useState(`${task.todo}`)
	const [edit, setEdit] = useState(false)
	const [isShow, setIsShow] = useState(false)
	const [createdTime, setCreatedTime] = useState("")

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
					<MdOutlineCoffeeMaker color="#AC6089" />
					<p className="date">{createdTime}</p>
				</div>
				<div className="dates due-at">
					<BsCalendarEvent color="#33948D" />
					<p className="date">Sun 1 Oct 2022</p>
				</div>
			</div>
		</div>
	)
}

export default Todo
