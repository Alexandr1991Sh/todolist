import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: { taskId: string, todolistId: string }
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    payload: { title: string, todolistId: string }
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    payload: { taskId: string, isDone: boolean, todolistId: string }
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    payload: { taskId: string, newTitle: string, todolistId: string }
}

let todolistId1 = v1();
let todolistId2 = v1();

const startState: TasksStateType = {
    [todolistId1]: [
        {id: '1', title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType = startState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        }

        default:
            return state
    }
}

export const RemoveTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}
export const AddTAsksAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}

export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, isDone, todolistId}}
}

export const ChangeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', payload: {taskId, newTitle, todolistId}}
}
