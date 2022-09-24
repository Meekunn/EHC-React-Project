/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef, useEffect } from "react"
import "./editCollectionName.scss"

const NAME_REGEX = /^[A-Za-z-]*$/

const UpdateCollectionName = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [collectionName, setCollectionName] = useState("")
	const [isOpen, setIsOpen] = useState(true)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const trimText = useCallback((text: string) => text.replace(/\s+/g, ""), [])

	const capitalizeText = (text: string): string => {
		return text.charAt(0).toUpperCase + text.substring(1).toLowerCase()
	}

	const handleSubmit = (e: any) => {
		e.preventDefault()
		console.log(collectionName)
		setCollectionName("")
	}

	return (
		<div className={isOpen ? "update-form-wrapper open" : "update-form-wrapper"}>
			<form id="collection_name_form" onSubmit={handleSubmit}>
				<label htmlFor="collection_name">New Collection Name: </label>
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
