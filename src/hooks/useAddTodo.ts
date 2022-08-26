import { db } from "../config/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { UserAuth } from "../HOC/AuthContext"

const useAddTodo = () => {

    const { userUid } = UserAuth()

    const add = async (todo: string, collectionName: string)=> {
        if(todo !== '') {
            const collectionRef = collection(db, `${collectionName}/${userUid}/todoList`)
            const payload = {
                todo: todo,
                //creates a timestamp which is unique so we use this as the key when returning documents in the subcollection.
                time: serverTimestamp(),
                complete: false
            }
            await addDoc(collectionRef, payload)
        }
    }
    return { add }
}

export default useAddTodo
