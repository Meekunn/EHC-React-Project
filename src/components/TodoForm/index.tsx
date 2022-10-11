/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useCallback } from "react"
import { HiPlusSm } from "react-icons/hi"
import { BsFillCalendarPlusFill } from "react-icons/bs"

const TodoForm = ({ addTodo, todo, setTodo, setIsDueDate }: ITodoForm) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const trimStartTodo = useCallback((task: string) => {
		return task.trimStart()
	}, [])

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const handleClick = (e: any) => {
		e.preventDefault()
		setIsDueDate(true)
	}

	return (
		<form className="todo-form">
			<button type="submit" className="add-btn" onClick={addTodo}>
				<HiPlusSm />
			</button>
			<input
				type="text"
				ref={inputRef}
				className="input"
				placeholder="Add a task"
				value={todo}
				onChange={(e) => setTodo(trimStartTodo(e.target.value))}
			/>
			<button onClick={handleClick} className="date-btn">
				<BsFillCalendarPlusFill />
			</button>
		</form>
	)
}

export default TodoForm
