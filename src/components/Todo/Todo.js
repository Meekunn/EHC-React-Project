import { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { TbTrash } from 'react-icons/tb'
import './todo.scss'

const Todo = ({task}) => {

    const [completed, setCompleted] = useState(true)

    const checkToggle = () => {
        setCompleted(!completed)
    }
    
    return (
        <div id={task.time} className='todo-wrapper'>
            <div className='content'>
                {/* <input type="checkbox" checked="checked" /> */}
                <span onClick={checkToggle} className={completed ? "uncheck check" : "uncheck"}>
                    {/* <input type="checkbox" checked="checked" /> */}
                    <span className='checkmark'></span>
                </span>
                <span className='task'>
                    {task.todo}
                </span>
            </div>
            <div className='btns'>
                <button className="edit"><MdModeEdit /></button>
                <button className="delete"><TbTrash /></button>
            </div>
        </div>
    )
}

export default Todo