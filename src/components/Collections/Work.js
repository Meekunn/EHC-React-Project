import { useState, useEffect } from "react"
import {
    collection,
    addDoc,
    doc, 
    query, 
    onSnapshot, 
    orderBy,
    setDoc, 
    where,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { db, auth } from "../../config/firebase"
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { HiPlusSm } from 'react-icons/hi'
import Todo from "../Todo/Todo"
import Navbar from "../Navbar/Navbar"
import SideNav from "../SideNav/SideNav"
import CompletedTodo from "../Todo/CompletedTodo"
import { UserAuth } from "../../HOC/AuthContext"
import './collection.scss'

const Work = () => {

    const [todo, setTodo] = useState("")
    const [numOfUncomplete, setNumOfUncomplete] = useState()
    const [numOfComplete, setNumOfComplete] = useState()
    const [completedTasks, setCompletedTasks] = useState([])
    const [uncompletedTasks, setUncompletedTasks] = useState([])
    

    const router = useNavigate()
    const { user } = UserAuth()
    //const user = auth.currentUser

    useEffect(() => {
        getUncompleteTasks()
        getCompleteTasks()
    }, [])

    const addTodo = async () => {
        // if (user !== null) {
            // const uid = user.uid
            const collectionRef = collection(db, `work/${user?.uid}/todoList`)
            const payload = {
                todo,
                //creates a timestamp which is unique so we use this as the key when returning documents in the subcollection.
                time: serverTimestamp(),
                complete: false
            }
            await addDoc(collectionRef, payload)
        //}
    }

    const deleteTodo = async (id) => {
        if (user !== null ){
            //fetches the user's uid
            // const uid = user.uid
            const docRef = doc(db, `/work/${user?.uid}/todoList`, id)
            await deleteDoc(docRef)
        }
    }

    const editTodo = async (id, todo) => {
        // if (user !== null) {
            // const uid = user.uid
            const todoRef = doc(db, `work/${user?.uid}/todoList/${id}`)
            await setDoc (todoRef, {
                todo: todo
            }, {merge: true})
        //}
    }

    const getUncompleteTasks = () => {
        // if (user !== null ){
            //fetches the user's uid
            // const uid = user.uid
            //uses the uid as the document id in work collection and then creates a subcollection called todoList
            //returns an array of documents with "complete: false"
            const q = query(collection(db, `work/${user?.uid}/todoList`), where('complete', '==', false), orderBy('time', 'desc'))
            onSnapshot(q, (querySnapshot) => {
                let items = []
                querySnapshot.docs.map((doc) => {
                    return (
                        items.push({...doc.data(), id: doc.id})
                    )
                })
                setUncompletedTasks(items)
                setNumOfUncomplete(items.length)
            })
        //}
    }

    const getCompleteTasks = () => {
        // if (user !== null ){
            //fetches the user's uid
            // const uid = user.uid
            //uses the uid as the document id in work collection and then creates a subcollection called todoList
            //returns an array of documents with "complete: true"
            const q = query(collection(db, `work/${user?.uid}/todoList`), where('complete', '==', true), orderBy('time', 'desc'))
            onSnapshot(q, (querySnapshot) => {
                let items = []
                querySnapshot.docs.map((doc) => {
                    return (
                        items.push({...doc.data(), id: doc.id})
                    )
                })
                setCompletedTasks(items)
                setNumOfComplete(items.length)
            })
        //}
    }

    const checkComplete = async (id) => {
        // if (user !== null ){
            // const uid = user.uid
            const docRef = doc(db, `/work/${user?.uid}/todoList`, id)
            const payload = {
                complete : true,
                time: serverTimestamp()
            }
            await setDoc(docRef, payload, {merge: true})
        //}
    }

    const checkUncomplete = async (id) => {
        // if (user !== null ){
            const uid = user.uid
            const docRef = doc(db, `/work/${user?.uid}/todoList`, id)
            const payload = {
                complete : false
            }
            await setDoc(docRef, payload, {merge: true})
        //}
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
                            <button className='add-btn' onClick={() => {addTodo(); setTodo('')}}><HiPlusSm /></button>
                            <input 
                                type='text' 
                                className='input' 
                                placeholder="Add a task"
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                            />
                        </div>
                        <div className="tasks-container">
                            <p>Tasks - {numOfUncomplete} </p>
                            <div className="tasks-wrapper">
                                { uncompletedTasks.map((task) => {
                                    return (
                                        <Todo 
                                            key={task.id} 
                                            task={task} 
                                            checkComplete={checkComplete} 
                                            editTodo={editTodo}
                                            deleteTodo={deleteTodo}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="tasks-container">
                            <p>Completed - {numOfComplete} </p>
                            <div className="tasks-wrapper">
                                { completedTasks.map((task) => {
                                    return (
                                        <CompletedTodo 
                                            key={task.id} 
                                            task={task} 
                                            checkUncomplete={checkUncomplete} 
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

export default Work