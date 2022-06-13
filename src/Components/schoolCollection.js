// import {signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from "firebase/auth";
// import { auth, db } from "../config/firebase";
// import {doc, setDoc, collection, getDocs, query, where} from "firebase/firestore";

import { useState, useEffect } from 'react'


function SchoolCollection() {
    const [todos, setTodos] = useState('');
    useEffect(() => {
    }, [todos])

    const handleSubmit=(e)=>{
        e.preventDefault();
        // const newTodos = { todos }
        // setTodos([newTodos, ...todos]);

    }
  
return(
    <section>
        <section className='navigation'>
            <section className='navbar-menu'>
                <p>Dashboard</p>
                <p>Collections</p>
                <section className='navbar-icons'>
                    <p>Search</p>
                    <p>Notification</p>
                    <p>Profile Icon</p>
                </section>
            </section>
        </section>
        <section className='collection-sidebar'>
            <h1>Collections</h1>
            <p>School</p>
            <p>Personal</p>
            <p>Work</p>
        </section>
        <main className='main-container'>
            <h1>School</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Add a task'
                    value={todos}
                    onChange={(e) => setTodos(e.target.value) }
                />
                <input type='submit' text= 'Add todo'/>
            </form>
            <p>{todos}</p>
            <p>{todos}</p>

        </main>
    </section>

)
}
export default SchoolCollection;
