import { useState, useEffect } from "react"
import {
    collection,
    addDoc,
    doc, 
    query, 
    onSnapshot, 
    orderBy,
    setDoc, 
    deleteDoc,
    serverTimestamp
} from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { db } from "../../config/firebase"
import { UserAuth } from "../../HOC/AuthContext"
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { HiPlusSm } from 'react-icons/hi'
import Todo from "../Todo/Todo"
import Navbar from "../Navbar"
import SideNav from "../SideNav"
import CompletedTodo from "../Todo/CompletedTodo"
import './collection.scss'

const Work = () => {
    const { user } = UserAuth()

    const [todo, setTodo] = useState("")
    const [completedTasks, setCompletedTasks] = useState([])
    const [uncompletedTasks, setUncompletedTasks] = useState([])
    

    const router = useNavigate()

    useEffect(() => {
        if (typeof user?.uid !== "undefined") {
            const uid = user.uid
            const q = query(collection(db, `work/${uid}/todoList`), orderBy('time', 'desc'))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.docs.map((doc) => {
                    const data = doc.data()
                    if (data.complete === false) {
                        return setUncompletedTasks(prevTasks => {
                            const itExists = prevTasks.find(task => task.id === doc.id)
                            if (itExists) return prevTasks
                            return [...prevTasks, {...data, id: doc.id}]
                        })
                    }
                    return setCompletedTasks(prevTasks => {
                        const itExists = prevTasks.find(task => task.id === doc.id)
                        if (itExists) return prevTasks
                        return [...prevTasks, {...data, id: doc.id}]
                    })
                })
            })
            return () => {
                unsubscribe()
            }
        }
    }, [user])

    const addTodo = async () => {
        if (user !== null) {
            const uid = user.uid
           if(todo !== '') {
                const collectionRef = collection(db, `work/${uid}/todoList`)
                const payload = {
                    todo,
                    //creates a timestamp which is unique so we use this as the key when returning documents in the subcollection.
                    time: serverTimestamp(),
                    complete: false
                }
                await addDoc(collectionRef, payload)
           } else {
            setTodo('')
           }
        }
        setTodo('')
    }

    const deleteTodo = async (id) => {
        if (user !== null ){
            //fetches the user's uid
            const uid = user.uid
            const docRef = doc(db, `/work/${uid}/todoList`, id)
            await deleteDoc(docRef)
        }
    }

    const editTodo = async (id, todo) => {
        if (user !== null) {
            const uid = user.uid
            const todoRef = doc(db, `work/${uid}/todoList/${id}`)
            await setDoc (todoRef, {
                todo: todo
            }, {merge: true})
        }
    }

    const toggleTodo = async (id, complete) => {
        if (typeof user?.uid !== "undefined") {
            const uid = user.uid
            const todoRef = doc(db, `work/${uid}/todoList/${id}`)
            try {
                await setDoc (todoRef, {
                    complete,
                    time: complete ? serverTimestamp() : null
                }, {merge: true})
                if (complete) {
                    setUncompletedTasks(prevTasks => {
                        const newArray = prevTasks.filter(task => task.id !== id)
                        return [...newArray];
                    })
                } else {
                    setCompletedTasks(prevTasks => {
                        const newArray = prevTasks.filter(task => task.id !== id)
                        return [...newArray];
                    })
                }
            } catch (error) {
            }
        }
    }

    return (
        <main>
            <Navbar />
            <div className="todos-wrapper">
                <SideNav />
                <div className="todolist">
                    <div className='wrapper'>
                        <div className="heading">
                            <span>
                                <button className="back-arrow" onClick={() => {router('/dashboard')}}>
                                    <MdOutlineKeyboardArrowLeft />
                                </button>
                                Work
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
                            <p>Tasks - {uncompletedTasks.length} </p>
                            <div className="tasks-wrapper">
                                { uncompletedTasks.map((task) => {
                                    return (
                                        <Todo 
                                            key={task.id}
                                            {...({task, toggleTodo, editTodo, deleteTodo})}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="tasks-container">
                            <p>Completed - {completedTasks.length} </p>
                            <div className="tasks-wrapper">
                                { completedTasks.map((task) => {
                                    return (
                                        <CompletedTodo 
                                            key={task.id} 
                                            {...({task, toggleTodo, deleteTodo})}
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

export default Work