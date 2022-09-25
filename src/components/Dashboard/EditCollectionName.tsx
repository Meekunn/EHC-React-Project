/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef, useEffect } from "react"
import { FiCheckCircle } from "react-icons/fi"
import { TiTimes } from "react-icons/ti"
import "./editCollectionName.scss"

const NAME_REGEX = /^[A-Z][a-z-]{3,12}$/

const UpdateCollectionName = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [collectionName, setCollectionName] = useState("")
	const [validCollectionName, setValidCollectionName] = useState(false)
	const [isOpen, setIsOpen] = useState(true)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	useEffect(() => {
		setValidCollectionName(NAME_REGEX.test(collectionName))
	}, [collectionName])

	const trimText = useCallback((text: string) => text.replace(/\s+/g, ""), [])

	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (validCollectionName) {
			console.log(collectionName)
			setCollectionName("")
		}
	}

	return (
		<div className={isOpen ? "update-form-wrapper open" : "update-form-wrapper"}>
			<form id="collection_name_form" onSubmit={handleSubmit}>
				<label htmlFor="collection_name">
					New Collection Name:
					<FiCheckCircle className={validCollectionName ? "valid" : "hide"} />
					<TiTimes
						className={validCollectionName || !collectionName ? "hide" : "invalid"}
					/>
				</label>
				{validCollectionName || !collectionName ? (
					<></>
				) : (
					<p>
						Length is 4 to 12 Characters and ensure first character is in Uppercase.
						Special Character allows is <strong>-</strong>
					</p>
				)}
				<input
					id="collection_name"
					ref={inputRef}
					type="text"
					placeholder="Groceries"
					value={collectionName}
					onChange={(e) => setCollectionName(trimText(e.target.value))}
				/>
				<button>Update</button>
			</form>
		</div>
	)
}

export default UpdateCollectionName
