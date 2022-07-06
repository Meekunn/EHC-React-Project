import { useState } from 'react'
import { MdModeEdit, MdCloudDone } from 'react-icons/md'
import { TbTrash } from 'react-icons/tb'
import { deleteTodo, editTodo } from '../../HOC/utils'
import './todo.scss'

const Todo = ({task, checkComplete}) => {
    
    const [todoEdit, setTodoEdit] = useState("")
    const [edit, setEdit] = useState(false)

    return (
        <div id={task.id} className='todo-wrapper'>
            <div className='content'>
                <button onClick={() => {checkComplete(task.id)}} className="uncheck">
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
                            {task.todo}
                        </span>
                    )
                }
            </div>
            <div className='btns'>
                {
                    edit ? (
                        <button onClick={() => {editTodo(task.id, todoEdit); setEdit(false)}}>
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