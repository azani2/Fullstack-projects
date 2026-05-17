import type { IdType } from "../shared/common-types"

export enum TodoStatus {
    ACTIVE = 1,
    COMPLETED,
    CANCELLED
}

export class Todo {
    static nextId = 0
    static className = 'todo'

    public id: IdType
    text: string
    status: TodoStatus

    constructor(text: string, status?: TodoStatus)
    constructor(todo: Omit<Todo, "id">)

    constructor(arg1: string | Omit<Todo, "id">, arg2: TodoStatus = TodoStatus.ACTIVE) {
        this.id = ++Todo.nextId

        if (typeof arg1 === "string") {
            this.text = arg1
            this.status = arg2
        } else {
            this.text = arg1.text
            this.status = arg1.status ?? TodoStatus.ACTIVE
        }
    }
}