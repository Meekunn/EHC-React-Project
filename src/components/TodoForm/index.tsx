import { useRef, useEffect, useCallback } from "react"
import { HiPlusSm } from "react-icons/hi"

const TodoForm = ({ addTodo, todo, setTodo }: ITodoForm) => {
	const formRef = useRef<HTMLInputElement>(null)
	const trimStartTodo = useCallback((task: string) => {
		return task.trimStart()
	}, [])

	useEffect(() => {
		formRef.current?.focus()
	}, [])

	return (
		<form className="todo-form">
			<button type="submit" className="add-btn" onClick={addTodo}>
				<HiPlusSm />
			</button>
			<input
				type="text"
				ref={formRef}
				className="input"
				placeholder="Add a task"
				value={todo}
				onChange={(e) => setTodo(trimStartTodo(e.target.value))}
			/>
		</form>
	)
}

export default TodoForm
