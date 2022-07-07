import React from 'react'
import { 
    deleteDoc, 
    doc,  
    setDoc
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

export const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

// export const addTodo = async (subcollection,todo) => {
//     if (user !== null) {
//         const uid = user.uid
//         const collectionRef = collection(db, `school/${uid}/todoList`)
//         const payload = {
//             todo: todo,
//             //creates a timestamp which is unique so we use this as the key when returning documents in the subcollection.
//             time: serverTimestamp(),
//             complete: false
//         }
//         await addDoc(collectionRef, payload)
//     }
// }

