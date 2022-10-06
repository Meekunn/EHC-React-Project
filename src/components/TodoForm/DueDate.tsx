/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from "react"
import { TiTimes } from "react-icons/ti"
import "./duedate.scss"

interface IDueDate {
	isDueDate: boolean
	setIsDueDate: React.Dispatch<React.SetStateAction<boolean>>
	dueTime: string
	setDueTime: React.Dispatch<React.SetStateAction<string>>
	dueDate: string
	setDueDate: React.Dispatch<React.SetStateAction<string>>
	editDueDate?: (id: string, dueDate: string, dueTime: string) => Promise<void>
}

const DueDate = ({
	isDueDate,
	setIsDueDate,
	dueDate,
	setDueDate,
	dueTime,
	setDueTime,
}: IDueDate) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [inputDate, setInputDate] = useState("")
	const [inputTime, setInputTime] = useState("")
	const [done, setDone] = useState(false)

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	const handleSubmit = (e: any) => {
		e.preventDefault()
		const date = new Date(`${inputDate}, ${inputTime}`)
		inputDate !== "" ? setDueDate(date.toDateString()) : setDueDate(dueDate)
		inputTime !== ""
			? setDueTime(date.getHours().toString() + ": " + date.getMinutes().toString())
			: setDueTime(dueTime)
		setDone(true)
		setIsDueDate(false)
	}

	return (
		<div className={isDueDate ? "duedate-wrapper open" : "duedate-wrapper"}>
			<span className="close-btn-wrapper">
				<button className="close-btn" onClick={() => setIsDueDate(false)}>
					<TiTimes />
				</button>
			</span>
			<form id="due_date_time_form" onSubmit={handleSubmit}>
				<p className={done ? "duedate_p success" : "duedate_p"}>All Set! &#128526;</p>
				<label htmlFor="due_date">Select Due Date:</label>
				<input
					id="due_date"
					required
					ref={inputRef}
					type="date"
					value={inputDate}
					onChange={(e) => setInputDate(e.target.value)}
				/>
				<label htmlFor="due_date">Select Due Time:</label>
				<input
					id="due_date"
					required
					type="time"
					value={inputTime}
					onChange={(e) => setInputTime(e.target.value)}
				/>
				<button className="submit-btn" type="submit" onClick={handleSubmit}>
					Set Due Date
				</button>
			</form>
		</div>
	)
}

export default DueDate
