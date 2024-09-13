import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

type ActionsType = removeTodolistACType | addTodolistACType | changeTodolistACType | changeTodolistFilterACType
// type ActionsType = {
//     type: string
//     payload: any
// }

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case "todos/REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "todos/ADD-TODOLIST": {
            const todolistId = v1()
            const newTodolist: TodolistType = {id: todolistId, title: action.payload.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case "todos/CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        case "todos/CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state
    }
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'todos/REMOVE-TODOLIST',
        payload: {id: todolistId}
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'todos/ADD-TODOLIST',
        payload: {title}
    } as const
}

export type changeTodolistACType = ReturnType<typeof changeTodolistAC>
export const changeTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'todos/CHANGE-TODOLIST-TITLE',
        payload: {todolistId, title}
    } as const
}
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string) => {
    return {
        type: 'todos/CHANGE-TODOLIST-FILTER',
        payload: {filter, todolistId}
    } as const
}

