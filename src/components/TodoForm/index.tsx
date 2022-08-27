import { HiPlusSm } from 'react-icons/hi'

const TodoForm = ({addTodo, todo, setTodo}: ITodoForm) => {
    return (
        <form className="todo-form">
            <button type='submit' className='add-btn' onClick={addTodo}><HiPlusSm /></button>
            <input 
                type='text' 
                className='input' 
                placeholder="Add a task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
        </form>
    )
}

export default TodoForm