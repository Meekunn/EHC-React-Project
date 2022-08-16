import { db } from "../config/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

const useAddTodo = () => {
    const add = async (todo, uid, collectionName) => {
        if(todo !== '') {
            const collectionRef = collection(db, `${collectionName}/${uid}/todoList`)
            const payload = {
                todo: todo,
                //creates a timestamp which is unique so we use this as the key when returning documents in the subcollection.
                time: serverTimestamp(),
                complete: false
            }
            await addDoc(collectionRef, payload)
            console.log('Added')
        }
    }
    return { add }
}

export default useAddTodo

// const addTodo = async () => {
//     if(todo !== '') {
//         const collectionRef = collection(db, `school/${userUid}/todoList`)
//         const payload = {
//             todo,
//             //creates a timestamp which is unique so we use this as the key when returning documents in the subcollection.
//             time: serverTimestamp(),
//             complete: false
//         }
//         await addDoc(collectionRef, payload)
//     }
//     setTodo('')
// }