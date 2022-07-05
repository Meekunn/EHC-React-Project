import React from 'react'
import { 
    deleteDoc, 
    addDoc,
    collection,
    doc,  
    setDoc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore"
import { auth, db } from "../config/firebase"
import MuiAlert from "@material-ui/lab/Alert"

const user = auth.currentUser

export const createSchoolCollection = async (id, userName) => {
    const docRef = doc(db, 'school', id)
    const payload = {
        userName
    }
    await setDoc(docRef, payload)
}

export const createWorkCollection = async (id, userName) => {
    const docRef = doc(db, 'work', id)
    const payload = {
        userName
    }
    await setDoc(docRef, payload)
}

export const createPersonalCollection = async (id, userName) => {
    const docRef = doc(db, 'personal', id)
    const payload = {
        userName
    }
    await setDoc(docRef, payload)
}

export const addTodo = async (todo) => {
    if (user !== null) {
        const uid = user.uid
        const collectionRef = collection(db, `school/${uid}/todoList`)
        const payload = {
            todo: todo,
            //creates a timestamp which is unique so we use this as the key when returning documents in the subcollection.
            time: serverTimestamp(),
            complete: false
        }
        await addDoc(collectionRef, payload)
    }
}

export const deleteTodo = async (id) => {
    if (user !== null ){
        //fetches the user's uid
        const uid = user.uid
        const docRef = doc(db, `/school/${uid}/todoList`, id)
        await deleteDoc(docRef)
    }
}

export const editTodo = async (id, todo) => {
    if (user !== null) {
        const uid = user.uid
        const todoRef = doc(db, `school/${uid}/todoList/${id}`)
        await setDoc (todoRef, {
            todo: todo
        }, {merge: true})
        console.log('edited')
    }
}

export const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})