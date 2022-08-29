import { useState, useEffect, useCallback } from "react"
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
import Navbar from "../Navbar"
import SideNav from "../SideNav"
import Todo from "../Todo/Todo"
import TodoForm from "../TodoForm"
import CompletedTodo from "../Todo/CompletedTodo"
import useAddTodo from "../../hooks/useAddTodo"
import { ITasks } from "../../types/index"
import LinearProgress from "../LinearProgress"
import './collection.scss'

const Collection = ({collectionName}: ICollectionName) => {

    const router = useNavigate()
    const { add } = useAddTodo()
    const { user } = UserAuth()

    const [todo, setTodo] = useState("")
    const [completedTasks, setCompletedTasks] = useState<ITasks[]>([])
    const [uncompletedTasks, setUncompletedTasks] = useState<ITasks[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isToggling, setIsToggling] = useState(false)

    useEffect(() => {
        const q = query(collection(db, `${collectionName}/${user.uid}/todoList`), orderBy('time', 'desc'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setLoading(false)
            querySnapshot.docs.map((doc) => {
                const data = doc.data()
                if (data.complete === false && data.time != null) {
                    return setUncompletedTasks((prevTasks: any) => {
                        const itExists = prevTasks.find((task: { id: string }) => task.id === doc.id)
                        if (itExists) return prevTasks
                        const items = [...prevTasks, {...doc.data(), id: doc.id}]
                        const sortedItems = items.sort((x, y) => {
                            return y.time - x.time
                        })
                        return sortedItems
                    })
                }
                else if (data.complete === true && data.time != null) {
                    return setCompletedTasks((prevTasks: any) => {
                        const itExists = prevTasks.find((task: { id: string }) => task.id === doc.id)
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

    const addTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        add(todo, collectionName, setIsAdding)
        setTodo('')
    }

    const toggleTodo = async (id: string, complete: boolean) => {
        setIsToggling(true)
        const todoRef = doc(db, `${collectionName}/${user.uid}/todoList/${id}`)
        try {
            await setDoc (todoRef, {
                complete,
                time: serverTimestamp()
            }, {merge: true})
            if (complete) {
                setUncompletedTasks(prevTasks => {
                    const newArray = prevTasks.filter((task: ITasks) => task.id !== id)
                    return [...newArray]
                })
            } else {
                setCompletedTasks(prevTasks => {
                    const newArray = prevTasks.filter((task: ITasks) => task.id !== id)
                    return [...newArray]
                })
            }
            setIsToggling(false)
        } catch (error: any) {
            setIsToggling(false)
            return error
        }
    }

    const editTodo = async (id: string, todo: string) => {
        const todoRef = doc(db, `${collectionName}/${user.uid}/todoList/${id}`)
        await setDoc (todoRef, {
            todo: todo,
            time: serverTimestamp()
        }, {merge: true})
    }

    const deleteTodo = async (id: string) => {
        setIsDeleting(true)
        const deleteRef = doc(db, `${collectionName}/${user.uid}/todoList`, id)
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
            setIsDeleting(false)
        } catch(error: any){
            setIsDeleting(false)
            return error
        }
    }

    return (
        <main>
            <Navbar />
            <div className="todos-wrapper">
                <SideNav />
                { isAdding ? <LinearProgress bgColor='#F75F8C' label='Adding Task' /> : <></>}
                { isDeleting ? <LinearProgress bgColor='#F75F8C' label='Deleting Task' /> : <></>}
                { isToggling ? <LinearProgress bgColor='#F75F8C' label='Toggling' /> : <></>}
                { loading ? 
                    <>
                        <LinearProgress bgColor='#F75F8C' label='Loading' />
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
                            </div>
                        </div>
                    </> :
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
                            <TodoForm {...({addTodo, todo, setTodo})} />
                            <div className="tasks-container">
                                <p>Tasks - {uncompletedTasks.length} </p>
                                <div className="tasks-wrapper">
                                    { uncompletedTasks.map((task: ITasks) => {
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
                                    { completedTasks.map((task: ITasks) => {
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
                }
            </div>
        </main>
    )
}

export default Collection