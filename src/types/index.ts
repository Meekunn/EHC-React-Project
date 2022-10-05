/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITasks {
	complete: boolean
	todo: string
	time: {
		seconds: number
		nanoseconds: number
	}
	id: string
}

export interface ITodo {
	task: ITasks
	toggleTodo: (id: string, complete: boolean) => Promise<any>
	editTodo: (id: string, todo: string) => Promise<void>
	deleteTodo: (id: string) => Promise<any>
}

export interface ICompletedTodo {
	task: ITasks
	toggleTodo: (id: string, complete: boolean) => Promise<any>
	deleteTodo: (id: string) => Promise<any>
}
