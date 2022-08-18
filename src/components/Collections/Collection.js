import { useState, useEffect } from "react"
import {
    collection,
    doc,       
    query, 
    onSnapshot, 
    orderBy,
    setDoc, 
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore"
import { useNavigate } from "react-router-dom" 
import { db } from "../../config/firebase"
import { UserAuth } from "../../HOC/AuthContext"
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { HiPlusSm } from 'react-icons/hi'
import Navbar from "../Navbar"
import SideNav from "../SideNav"
import Todo from "../Todo/Todo"
import CompletedTodo from "../Todo/CompletedTodo"
import useAddTodo from "../../hooks/useAddTodo"
import './collection.scss'

const Collection = ({collectionName}) => {

    const router = useNavigate()
    const { add } = useAddTodo()
    const { user, userUid} = UserAuth()

    const [todo, setTodo] = useState("")
    const [completedTasks, setCompletedTasks] = useState([])
    const [uncompletedTasks, setUncompletedTasks] = useState([])

    useEffect(() => {
        const q = query(collection(db, `${collectionName}/${user.uid}/todoList`), orderBy('time', 'desc'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docs.map((doc) => {
                const data = doc.data()
                if (data.complete === false && data.time != null) {
                    return setUncompletedTasks(prevTasks => {
                        const itExists = prevTasks.find(task => task.id === doc.id)
                        if (itExists) return prevTasks
                        const items = [...prevTasks, {...doc.data(), id: doc.id}]
                        const sortedItems = items.sort((x, y) => {
                            return y.time - x.time
                        })
                        return sortedItems
                    })
                }
                else if (data.complete === true && data.time != null ) {
                    return setCompletedTasks(prevTasks => {
                        const itExists = prevTasks.find(task => task.id === doc.id)
                        if (itExists) return prevTasks
                        const items = [...prevTasks, {...doc.data(), id: doc.id}]
                        const sortedItems = items.sort((x,y) => {
                            return y.time - x.time
                        })
                        return sortedItems
                    })
                }
            })
        })
        return () => {
            unsubscribe()
        }
    }, [user])

    const capitalizeCollectionName = collectionName.charAt(0).toUpperCase() + collectionName.substring(1)
    
    const addTodo = (e) => {
        e.preventDefault()
        add(todo, user.uid, collectionName)
        setTodo('')
    }

    const toggleTodo = async (id, complete) => {
        const todoRef = doc(db, `${collectionName}/${userUid}/todoList/${id}`)
        try {
            await setDoc (todoRef, {
                complete,
                time: serverTimestamp()
            }, {merge: true})
            if (complete) {
                setUncompletedTasks(prevTasks => {
                    const newArray = prevTasks.filter(task => task.id !== id)
                    return [...newArray]
                })
            } else {
                setCompletedTasks(prevTasks => {
                    const newArray = prevTasks.filter(task => task.id !== id)
                    return [...newArray]
                })
            }
        } catch (error) {
            return error
        }
    }

    const editTodo = async (id, todo) => {
        const todoRef = doc(db, `${collectionName}/${userUid}/todoList/${id}`)
        await setDoc (todoRef, {
            todo: todo,
            time: serverTimestamp()
        }, {merge: true})
    }

    const deleteTodo = async (id) => {
        const deleteRef = doc(db, `${collectionName}/${userUid}/todoList`, id)
        try {
            await deleteDoc(deleteRef)
            setUncompletedTasks(prevTasks => {
                const newArray = prevTasks.filter(task => task.id !== id)
                return [...newArray]
            })
            setCompletedTasks(prevTasks => {
                const newArray = prevTasks.filter(task => task.id !== id)
                return [...newArray]
            })
        } catch(error){
            return error
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
                                {capitalizeCollectionName}
                            </span>
                            <span className='three-dots'>
                                ...
                            </span>
                        </div>
                        <form className="todo-form">
                            <button type='submit' className='add-btn' onClick={addTodo}><HiPlusSm /></button>
                            <input 
                                type='text' 
                                className='input' 
                                placeholder="Add a task"
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                            />
                        </form>
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
    )
}

export default Collection