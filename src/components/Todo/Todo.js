import { MdModeEdit } from 'react-icons/md'
import { TbTrash } from 'react-icons/tb'
import './todo.scss'

const Todo = ({task}) => {

    //const [title, setTitle] = useState(task.task)
    return (
        <div id={task.time} className='todo-wrapper'>
            <div className='content'>
                <input type='checkbox' className='uncheck' />
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