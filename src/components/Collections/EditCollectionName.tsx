/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef, useEffect } from "react"
import { FiCheckCircle } from "react-icons/fi"
import { TiTimes } from "react-icons/ti"
import "./editCollectionName.scss"

const NAME_REGEX = /^[A-Z][a-z-]{3,10}$/

interface IUpdateColName {
	collectionName: string
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateCollectionName = ({ collectionName, isOpen, setIsOpen }: IUpdateColName) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [validCollectionName, setValidCollectionName] = useState(false)
	const [newCollectionName, setNewCollectionName] = useState<string | null>("")
	const [warning, setWarning] = useState(false)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	useEffect(() => {
		if (newCollectionName) {
			setWarning(false)
			setValidCollectionName(NAME_REGEX.test(newCollectionName))
		}
	}, [newCollectionName])

	useEffect(() => {
		if (collectionName === "school") {
			setNewCollectionName(localStorage.getItem("school"))
		} else if (collectionName === "work") {
			setNewCollectionName(localStorage.getItem("work"))
		} else if (collectionName === "personal") {
			setNewCollectionName(localStorage.getItem("personal"))
		}
	}, [])

	const trimText = useCallback((text: string) => text.replace(/\s+/g, ""), [])

	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (validCollectionName && newCollectionName) {
			if (collectionName === "school") {
				localStorage.setItem("school", newCollectionName)
			} else if (collectionName === "work") {
				localStorage.setItem("work", newCollectionName)
			} else if (collectionName === "personal") {
				localStorage.setItem("personal", newCollectionName)
			}
			setNewCollectionName("")
			setIsOpen(false)
		} else if (!newCollectionName) {
			setWarning(true)
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
				{!validCollectionName && (
					<p>
						Length is 4 to 10 Characters and ensure first character is in Uppercase.
						Special Character allows is <strong>-</strong>
					</p>
				)}
				{warning && <p style={{ color: "red" }}>Field can&apos;t be empty!</p>}
				<input
					id="collection_name"
					ref={inputRef}
					type="text"
					placeholder="Groceries"
					value={newCollectionName!}
					onChange={(e) => setNewCollectionName(trimText(e.target.value))}
				/>
				<button className="submit-btn">Update</button>
			</form>
		</div>
	)
}

export default UpdateCollectionName
