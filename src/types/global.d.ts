
interface ITask {
    todo: string,
    complete: boolean,
    id: string,
}

interface IContextProvider {
    children: React.ReactNode
}

interface ICollectionName {
    collectionName: string
}