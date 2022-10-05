interface ITodoForm {
	todo: string
	setTodo: React.Dispatch<React.SetStateAction<string>>
	isDueDate: boolean
	setIsDueDate: React.Dispatch<React.SetStateAction<boolean>>
	addTodo: (e: React.MouseEvent<HTMLButtonElement>) => void
}
interface IContextProvider {
	children: React.ReactNode
}

interface ICollectionName {
	collectionName: string
}

interface ILinearProgressProps {
	bgColor: string
	label?: string
}

interface ISnackbar {
	focusValue: boolean
	value: string
	validValue: boolean
	info1: string
	info2?: string
	info3?: string
}
