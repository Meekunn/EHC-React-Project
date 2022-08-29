import { useRef, useEffect } from 'react'
import { HiPlusSm } from 'react-icons/hi'

const TodoForm = ({addTodo, todo, setTodo}: ITodoForm) => {

    const formRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        formRef.current?.focus();
    }, [])

    return (
        <form className="todo-form">
            <button type='submit' className='add-btn' onClick={addTodo}><HiPlusSm /></button>
            <input 
                type='text'
                ref={formRef} 
                className='input' 
                placeholder="Add a task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
        </form>
    )
}

export default TodoForm