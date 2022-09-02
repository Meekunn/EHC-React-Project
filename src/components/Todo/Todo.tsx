/* eslint-disable */
import { useState } from 'react'
import { MdModeEdit, MdCloudDone } from 'react-icons/md'
import { TbTrash } from 'react-icons/tb'
import { ITodo } from '../../types'
import './todo.scss'


const Todo = ({task, toggleTodo, editTodo, deleteTodo}: ITodo) => {
     
    const [todoEdit, setTodoEdit] = useState(`${task.todo}`)
    const [edit, setEdit] = useState(false)

    const handleEditTodo = () => {
        editTodo(task.id, todoEdit)
        setEdit(false)
    }

    return (
        <div id={task.id} className='todo-wrapper'>
            <div className='content'>
                <button onClick={() => toggleTodo(task.id, !task.complete)} className="uncheck">
                    <span className='checkmark'></span>
                </button>
                { edit ? 
                    (
                        <input 
                        className='input'
                        value= {todoEdit}
                        onChange= {(e) => setTodoEdit(e.target.value)}
                        />
                    ) : (
                        <span
                            className='task'
                        >
                            {todoEdit}
                        </span>
                    )
                }
            </div>
            <div className='btns'>
                {
                    edit ? (
                        <button onClick={handleEditTodo}>
                                <MdCloudDone />
                        </button>
                    ) : (
                        <button className="edit" onClick={()=>setEdit(true)}><MdModeEdit /></button>
                    )
                }
                <button className="delete" onClick={() => {deleteTodo(task.id)}}><TbTrash /></button>
            </div>
        </div>
    )
}

export default Todo