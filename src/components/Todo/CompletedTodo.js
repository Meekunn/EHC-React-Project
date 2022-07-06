import { TbTrash } from 'react-icons/tb'
import { deleteTodo } from '../../HOC/utils'
import './todo.scss'

const CompletedTodo = ({checkUncomplete, task}) => {
    return (
        <div id={task.id} className='todo-wrapper'>
            <div className='content'>
                <button onClick={() => {checkUncomplete(task.id)}} className="uncheck check">
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