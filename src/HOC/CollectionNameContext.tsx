/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, createContext, useState } from "react"

// interface IColNameContext {
// 	isOpen: boolean
// 	schoolColName: string
// 	workColName: string
// 	personalColName: string
// 	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
// 	setSchoolColName: React.Dispatch<React.SetStateAction<string>>
// 	setWorkColName: React.Dispatch<React.SetStateAction<string>>
// 	setPersonalColName: React.Dispatch<React.SetStateAction<string>>
// }

const CollectionNameContext = createContext<any>(null)

export const CollectionNameProvider = ({ children }: IContextProvider) => {
	const [isOpen, setIsOpen] = useState(false)
	const [newCollectionName, setNewCollectionName] = useState("")
	const [schoolColName, setSchoolColName] = useState("School")
	const [workColName, setWorkColName] = useState("Work")
	const [personalColName, setPersonalColName] = useState("Personal")

	const value = {
		isOpen,
		setIsOpen,
		newCollectionName,
		setNewCollectionName,
		schoolColName,
		setSchoolColName,
		workColName,
		setWorkColName,
		personalColName,
		setPersonalColName,
	}

	return <CollectionNameContext.Provider value={value}>{children}</CollectionNameContext.Provider>
}

export const UseCollectionName = () => {
	return useContext(CollectionNameContext)
}
