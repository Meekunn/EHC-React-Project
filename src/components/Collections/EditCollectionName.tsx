/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef, useEffect } from "react"
import { FiCheckCircle } from "react-icons/fi"
import { TiTimes } from "react-icons/ti"
import { UseCollectionName } from "../../HOC/CollectionNameContext"
import "./editCollectionName.scss"

const NAME_REGEX = /^[A-Z][a-z-]{3,10}$/

interface IUpdateColName {
	collectionName: string
}

const UpdateCollectionName = ({ collectionName }: IUpdateColName) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const {
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
	} = UseCollectionName()
	const [validCollectionName, setValidCollectionName] = useState(false)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	useEffect(() => {
		setValidCollectionName(NAME_REGEX.test(newCollectionName))
	}, [newCollectionName])

	useEffect(() => {
		if (collectionName === "school") {
			setNewCollectionName(schoolColName)
		} else if (collectionName === "work") {
			setNewCollectionName(workColName)
		} else if (collectionName === "personal") {
			setNewCollectionName(personalColName)
		}
	}, [schoolColName, workColName, personalColName])

	const trimText = useCallback((text: string) => text.replace(/\s+/g, ""), [])

	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (validCollectionName) {
			if (collectionName === "school") {
				setSchoolColName(newCollectionName)
			} else if (collectionName === "work") {
				setWorkColName(newCollectionName)
			} else if (collectionName === "personal") {
				setPersonalColName(newCollectionName)
			}
			setNewCollectionName("")
			setIsOpen(false)
		}
	}

	return (
		<div className={isOpen ? "update-form-wrapper open" : "update-form-wrapper"}>
			<span className="close-btn-wrapper">
				<button className="close-btn" onClick={() => setIsOpen(false)}>
					<TiTimes />
				</button>
			</span>
			<form id="collection_name_form" onSubmit={handleSubmit}>
				<label htmlFor="collection_name">
					New Collection Name:
					<FiCheckCircle className={validCollectionName ? "valid" : "hide"} />
					<TiTimes
						className={validCollectionName || !newCollectionName ? "hide" : "invalid"}
					/>
				</label>
				{validCollectionName || !newCollectionName ? (
					<></>
				) : (
					<p>
						Length is 4 to 10 Characters and ensure first character is in Uppercase.
						Special Character allows is <strong>-</strong>
					</p>
				)}
				<input
					id="collection_name"
					ref={inputRef}
					type="text"
					placeholder="Groceries"
					value={newCollectionName}
					onChange={(e) => setNewCollectionName(trimText(e.target.value))}
				/>
				<button className="submit-btn">Update</button>
			</form>
		</div>
	)
}

export default UpdateCollectionName
