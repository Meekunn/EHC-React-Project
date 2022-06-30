import { TbTrash } from 'react-icons/tb'
import './todo.scss'

const CompletedTodo = ({deleteTodo, checkToggle, task}) => {
    return (
        <div id={task.id} className='todo-wrapper'>
            <div className='content'>
                {/* <input type="checkbox" checked="checked" /> */}
                <span onClick={() => {checkToggle(task.id)}} className="uncheck check">
                    {/* <input type="checkbox" checked="checked" /> */}
                    <span className='checkmark'></span>
                </span>
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