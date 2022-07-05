import { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { TbTrash } from 'react-icons/tb'
import { deleteTodo } from '../../HOC/utils'
import './todo.scss'

const Todo = ({task, checkToggle, completed}) => {
    
    return (
        <div id={task.id} className='todo-wrapper'>
            <div className='content'>
                {/* <input type="checkbox" checked="checked" /> */}
                <button onClick={() => {checkToggle(task.id)}} className="uncheck">
                    {/* <input type="checkbox" checked="checked" /> */}
                    <span className='checkmark'></span>
                </button>
                <span className='task'>
                    {task.todo}
                </span>
            </div>
            <div className='btns'>
                <button className="edit"><MdModeEdit /></button>
                <button className="delete" onClick={() => {deleteTodo(task.id)}}><TbTrash /></button>
            </div>
        </div>
    )
}

export default Todo