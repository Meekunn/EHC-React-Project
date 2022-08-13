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
import { db, auth } from "../../config/firebase"
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { HiPlusSm } from 'react-icons/hi'
import Todo from "../Todo/Todo"
import Navbar from "../Navbar"
import SideNav from "../SideNav"
import CompletedTodo from "../Todo/CompletedTodo"
import './collection.scss'
import { UserAuth } from "../../HOC/AuthContext"

const Personal = () => {

    const [todo, setTodo] = useState("")
    const [completedTasks, setCompletedTasks] = useState([])
    const [uncompletedTasks, setUncompletedTasks] = useState([])
    

    const router = useNavigate()
    const { user } = UserAuth()

    useEffect(() => {
        if (typeof user?.uid !== "undefined") {
            const uid = user.uid
            const q = query(collection(db, `personal/${uid}/todoList`), orderBy('time', 'desc'))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.docs.map((doc) => {
                    const data = doc.data()
                    //console.log(data)
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
                console.log(uncompletedTasks)
                //console.log('useEffect')
                console.log(completedTasks)
            })
            return () => {
                unsubscribe()
            }
        }
    }, [user])

    const addTodo = async () => {
        if(todo !== '') {
            const uid = user.uid
            const collectionRef = collection(db, `personal/${uid}/todoList`)
            const payload = {
                todo,
                //creates a timestamp which is unique so we use this as the key when returning documents in the subcollection.
                time: serverTimestamp(),
                complete: false
            }
            await addDoc(collectionRef, payload)
        }
        setTodo('')
    }

    const deleteTodo = async (id) => {
        const uid = user.uid
        const deleteRef = doc(db, `personal/${uid}/todoList`, id)
        try {
            await deleteDoc(deleteRef)
            console.log('deleting')
        } catch(error){
        }
    }

    const editTodo = async (id, todo) => {
            const uid = user.uid
            const todoRef = doc(db, `personal/${uid}/todoList/${id}`)
            await setDoc (todoRef, {
                todo: todo
            }, {merge: true})
    }

    // const getUncompleteTasks = () => {
    //     if (user !== null ){
    //         //fetches the user's uid
    //         const uid = user.uid
    //         //uses the uid as the document id in school collection and then creates a subcollection called todoList
    //         //returns an array of documents with "complete: false"
    //         const q = query(collection(db, `personal/${uid}/todoList`), where('complete', '==', false), orderBy('time', 'desc'))
    //         onSnapshot(q, (querySnapshot) => {
    //             let items = []
    //             querySnapshot.docs.map((doc) => {
    //                 return (
    //                     items.push({...doc.data(), id: doc.id})
    //                 )
    //             })
    //             setUncompletedTasks(items)
    //             setNumOfUncomplete(items.length)
    //         })
    //     }
    // }

    // const getCompleteTasks = () => {
    //     if (user !== null ){
    //         //fetches the user's uid
    //         const uid = user.uid
    //         //uses the uid as the document id in school collection and then creates a subcollection called todoList
    //         //returns an array of documents with "complete: true"
    //         const q = query(collection(db, `personal/${uid}/todoList`), where('complete', '==', true), orderBy('time', 'desc'))
    //         onSnapshot(q, (querySnapshot) => {
    //             let items = []
    //             querySnapshot.docs.map((doc) => {
    //                 return (
    //                     items.push({...doc.data(), id: doc.id})
    //                 )
    //             })
    //             setCompletedTasks(items)
    //             setNumOfComplete(items.length)
    //         })
    //     }
    // }

    // const checkComplete = async (id) => {
    //     if (user !== null ){
    //         const uid = user.uid
    //         const docRef = doc(db, `/personal/${uid}/todoList`, id)
    //         const payload = {
    //             complete : true,
    //             time: serverTimestamp()
    //         }
    //         await setDoc(docRef, payload, {merge: true})
    //     }
    // }

    // const checkUncomplete = async (id) => {
    //     if (user !== null ){
    //         const uid = user.uid
    //         const docRef = doc(db, `/personal/${uid}/todoList`, id)
    //         const payload = {
    //             complete : false
    //         }
    //         await setDoc(docRef, payload, {merge: true})
    //     }
    // }

    const toggleTodo = async (id, complete) => {
            const uid = user.uid
            const todoRef = doc(db, `personal/${uid}/todoList/${id}`)
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
                                Personal
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

export default Personal