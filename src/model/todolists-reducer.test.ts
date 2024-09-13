import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    addTodolistAC, changeTodolistAC,
    changeTodolistACType, changeTodolistFilterAC,
    removeTodolistAC,
    removeTodolistACType,
    todolistsReducer
} from "./todolists-reducer";

test('two plus two is four', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(initialState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const newTitle = 'New Todolist'

    const endState = todolistsReducer(initialState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
})

test('correct todolist should change its name', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const newTitle = 'New Todolist Title'

    const endState = todolistsReducer(initialState, changeTodolistAC(todolistID1, newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const changeFilter = 'completed'

    const endState = todolistsReducer(initialState, changeTodolistFilterAC(changeFilter,todolistID2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(changeFilter)
})