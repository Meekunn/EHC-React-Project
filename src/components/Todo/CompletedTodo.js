import { TbTrash } from 'react-icons/tb'
import './todo.scss'

const CompletedTodo = ({toggleTodo, task, deleteTodo}) => {
    return (
        <div id={task.id} className='todo-wrapper'>
            <div className='content'>
                <button onClick={() => {toggleTodo(task.id, !task.complete)}} className="uncheck check">
                    <span className='checkmark'></span>
                </button>
                <span className='task'>
                    {task.todo}
                </span>
            </div>
            <div className='btns'>
                <button className="delete" onClick={() => {deleteTodo(task.id)}}><TbTrash /></button>
            </div>
        </div>
    )
}

export default CompletedTodo