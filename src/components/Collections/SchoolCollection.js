import { useState, useEffect } from "react"
import { 
    deleteDoc, 
    addDoc,
    collection,
    doc, 
    query, 
    serverTimestamp, 
    onSnapshot, 
    orderBy, 
    updateDoc
} from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { db, auth } from "../../config/firebase"
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { HiPlusSm } from 'react-icons/hi'
import Todo from "../Todo/Todo"
import './collection.scss'
import Navbar from "../Navbar/Navbar"
import SideNav from "../SideNav/SideNav"
import CompletedTodo from "../Todo/CompletedTodo"

function School() {

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [completed, setCompleted] = useState(false)
    const [numOfTasks, setNumOfTasks] = useState(0)
    const [completedTasks, setCompletedTasks] = useState([])
    const [uncompletedTasks, setUncompletedTasks] = useState([])
    const [isMobile, setIsMobile] = useState(false)

    const router = useNavigate()
    const user = auth.currentUser

    useEffect(() => {
        getSchoolCollection()
    }, [])

    const addTodo = async () => {
        if (user !== null) {
            const uid = user.uid
            const collectionRef = collection(db, `school/${uid}/todoList`)
            const payload = {
                todo,
                //creates a timestamp which is unique so we use this as the key when returning documents in the subcollection.
                time: serverTimestamp(),
                complete: false
            }
            const docRef = await addDoc(collectionRef, payload)
            setTodo('')
        }
        //getSchoolCollection()
    };

    const getSchoolCollection = () => {
        if (user !== null ){
            //fetches the user's uid
            const uid = user.uid
            //uses the uid as the document id in school collection and then creates a subcollection called todoList
            const q = query(collection(db, `school/${uid}/todoList`), orderBy('time', 'desc'))
            const unsub = onSnapshot(q, (querySnapshot) => {
                let items = []
                querySnapshot.docs.map((doc) => {
                    items.push({...doc.data(), id: doc.id})
                })
                setTodos(items)
                setNumOfTasks(items.length)
            })
        }
    }

    const checkToggle = (id) => {
        //setCompleted(!completed)
        if (user !== null ){
            const uid = user.uid
            const docRef = doc(db, `/school/${uid}/todoList`, id)
            if (completed === false ) {
                let items = []
                items = todos.map(async (item) =>  {
                    if (item.id === id) {
                        await updateDoc (docRef, {
                            complete : true
                        })
                    }
                    return item
                })
                setCompletedTasks(items)
                setCompleted(true)
                console.log(completedTasks)
            }
            else {
                let items = []
                items = todos.map(async (item) =>  {
                    if (item.id === id) {
                        await updateDoc (docRef, {
                            complete : false
                        })
                    }
                    return item
                })
                setUncompletedTasks(items)
                setCompleted(false)
                console.log(uncompletedTasks)
            }
        }
    }

    const deleteTodo = async (id) => {
        if (user !== null ){
            //fetches the user's uid
            const uid = user.uid
            const docRef = doc(db, `/school/${uid}/todoList`, id)
            await deleteDoc(docRef)
            console.log('deleted')
        }
    }

    const toggleSideNav = () => {
        setIsMobile(!isMobile)
    }

    return (
        <main>
            <Navbar isMobile={isMobile} toggleSideNav={toggleSideNav} />
            <div className="todos-wrapper">
                <SideNav isMobile={isMobile} toggleSideNav={toggleSideNav}/>
                <div className="todolist">
                    <div className='wrapper'>
                        <div className="heading">
                            <span>
                                <button className="back-arrow" onClick={() => {router('/dashboard')}}>
                                    <MdOutlineKeyboardArrowLeft />
                                </button>
                                School
                            </span>
                            <button style={{border: 'none', background: 'transparent'}}>
                                ...
                            </button>
                        </div>
                        <div className="todo-form">
                            <button className='add-btn' onClick={addTodo}><HiPlusSm /></button>
                            <input 
                                type='text' 
                                className='input' 
                                placeholder="Add a task"
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                            />
                        </div>
                        <div className="tasks-container">
                            <p>Tasks - {numOfTasks} </p>
                            <div className="tasks-wrapper">
                                { todos.map((task) => {
                                    return (
                                        <Todo 
                                            key={task.id} 
                                            task={task} 
                                            checkToggle={checkToggle} 
                                            completed={completed} 
                                            deleteTodo={deleteTodo}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="tasks-container">
                            <p>Completed - 0 </p>
                            <div className="tasks-wrapper">
                                {todos.map((task) => {
                                    return (
                                        <CompletedTodo 
                                            key={task.id} 
                                            task={task} 
                                            checkToggle={checkToggle} 
                                            completed={completed} 
                                            deleteTodo={deleteTodo}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default School