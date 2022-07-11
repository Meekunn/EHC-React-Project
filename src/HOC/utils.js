import {  
    doc,  
    setDoc
} from "firebase/firestore"
import { db } from "../config/firebase"

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


