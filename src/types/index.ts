import { FieldValue } from "firebase/firestore"

export interface ITasks {
    complete: boolean,
    todo: string,
    time?: FieldValue,
    id: string,
}

export interface ITodo {
    task: ITasks,
    toggleTodo: (id: string, complete: boolean) => Promise<any>,
    editTodo: (id: string, todo: string) => Promise<void>,
    deleteTodo: (id: string) => Promise<any>,
}

export interface ICompletedTodo {
    task: ITasks,
    toggleTodo: (id: string, complete: boolean) => Promise<any>,
    deleteTodo: (id: string) => Promise<any>,
}