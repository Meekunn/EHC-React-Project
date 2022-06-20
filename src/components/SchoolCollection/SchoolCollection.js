import { useState, useEffect } from "react"
import { addDoc, collection, query, serverTimestamp, onSnapshot, orderBy } from "firebase/firestore"
import { db, auth } from "../../config/firebase"
import { FaSchool, } from 'react-icons/fa'
import { MdOutlinePersonalInjury, MdWork, MdDashboard, MdOutlineAddBox } from 'react-icons/md'
import { BsCollectionFill } from 'react-icons/bs'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { BiSearch } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import Todo from "../Todo/Todo"
import './school.scss';

function School() {

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([])

    const user = auth.currentUser

    useEffect(() => {
        getColl()
    }, [])

    const addTodo = async () => {
        if (user !== null) {
            const uid = user.uid
            await addDoc(collection(db, `school/${uid}/todoList`), {
                todo,
                time: serverTimestamp(),
                complete: false
            })
        }
        getColl()
    };

    const getColl = () => {
        if (user !== null ){
            const uid = user.uid
            const q = query(collection(db, `school/${uid}/todoList`), orderBy('time', 'desc'))
            const unsub = onSnapshot(q, (querySnapshot) => {
                let items = [];
                querySnapshot.forEach(doc => {
                    items.push({...doc.data()})
                })
                console.log(items)
                setTodos(items)
            })
            return () => unsub();
        } else {
            console.log('no user found')
        }
    }

    return (
        <main>

            <section className='nav'>
                <ul className='navigation-left'>
                    <li> <MdDashboard className='icons' /> </li>
                    <li>Dashboard</li>
                    <li><BsCollectionFill className='icons' /></li>
                    <li>Collections</li>
                </ul>
                <ul className='navigation-right'>
                    <li> <BiSearch className='icons' /> </li>
                    <li> <IoIosNotificationsOutline className='icons' /> </li>
                    <li> <CgProfile className='icons' /> </li>
                </ul>
            </section>
            <article className="todo-wrapper">
                <section className='sidebar'>
                    <h1>Collections</h1>
                    <ul className="sidebar-list">
                        <li><FaSchool className="school" /> School</li>
                        <li><MdOutlinePersonalInjury className="personal" /> Personal</li>
                        <li><MdWork className="work" /> Work</li>
                    </ul>
                </section>

                <section className="todo">
                    <button onClick={addTodo}>Add Me</button>
                    <h1>SCHOOL</h1>
                    <MdOutlineAddBox className="input-icon" />

                    <input
                        type='text'
                        placeholder="Add a task"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />

                    <h2>Tasks</h2>
                    <ul>
                        {todos.map((td) => {
                            return (
                                <li key={td.time} className='todos'>
                                    {td.todo}
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </article>
        </main>
    );
}

export default School