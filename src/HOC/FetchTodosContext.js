import { createContext, useContext, useState, useEffect } from "react"
import { UserAuth } from "./AuthContext"
import { db } from "../config/firebase"
import { query, orderBy, collection, onSnapshot } from "firebase/firestore"

const FetchTodosContext = createContext()

// eslint-disable-next-line react/prop-types
export const FetchTodosContextProvider = ({ children }) => {
	const { user } = UserAuth()

	const [completedTasks, setCompletedTasks] = useState([])
	const [uncompletedTasks, setUncompletedTasks] = useState([])

	useEffect(() => {
		const q = query(collection(db, `work/${user.uid}/todoList`), orderBy("time", "desc"))
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let allTasks = []
			querySnapshot.docs.map((doc) => {
				allTasks.push({ ...doc.data(), id: doc.id })
				const data = doc.data()
				if (data.complete === false && data.time != null) {
					return setUncompletedTasks((prevTasks) => {
						const itExists = prevTasks.find((task) => task.id === doc.id)
						if (itExists) return prevTasks
						const items = [...prevTasks, { ...doc.data(), id: doc.id }]
						const sortedItems = items.sort((x, y) => {
							return y.time - x.time
						})
						return sortedItems
					})
				} else if (data.complete === true && data.time != null) {
					return setCompletedTasks((prevTasks) => {
						const itExists = prevTasks.find((task) => task.id === doc.id)
						if (itExists) return prevTasks
						const items = [...prevTasks, { ...doc.data(), id: doc.id }]
						const sortedItems = items.sort((x, y) => {
							return x.time - y.time
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

	return (
		<FetchTodosContext.Provider
			value={{ completedTasks, uncompletedTasks, setCompletedTasks, setUncompletedTasks }}
		>
			{children}
		</FetchTodosContext.Provider>
	)
}

export const WithFetchTodos = () => {
	return useContext(FetchTodosContext)
}
