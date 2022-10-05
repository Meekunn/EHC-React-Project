import { useState, useEffect } from "react"
import { TbTrash } from "react-icons/tb"
import { BsCalendar2Check } from "react-icons/bs"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"
import { ICompletedTodo } from "../../types"
import "./todo.scss"

const CompletedTodo = ({ toggleTodo, task, deleteTodo }: ICompletedTodo) => {
	const [isShow, setIsShow] = useState(false)
	const [createdTime, setCreatedTime] = useState("")

	useEffect(() => {
		const timestamp = new Date(task.time.seconds * 1000)
		const hour = timestamp.getHours().toString()
		const minute = timestamp.getMinutes().toString()
		const date = timestamp.toDateString()
		setCreatedTime(`${hour}:${minute}, ${date}`)
	}, [])

	return (
		<div id={task.id} className="todo-wrapper">
			<div className="todo-content">
				<div className="content">
					<button
						onClick={() => {
							toggleTodo(task.id, !task.complete)
						}}
						className="uncheck check"
					>
						<span className="checkmark"></span>
					</button>
					<span className="task">{task.todo}</span>
				</div>
				<div className="btns">
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
				<div className="dates due-at">
					<BsCalendar2Check color="#33948D" />
					<p className="date">Sun 1 Oct 2022</p>
				</div>
			</div>
		</div>
	)
}

export default CompletedTodo
