interface ITodoForm {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    addTodo: (e: React.MouseEvent<HTMLButtonElement>) => void,
}
interface IContextProvider {
    children: React.ReactNode
}

interface ICollectionName {
    collectionName: string
}