import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTAsksAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";


test('Remove task', () => {
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

    const endState = tasksReducer(startState, RemoveTaskAC('1', todolistId1))

    expect(endState[todolistId1].length).toBe(1);
    expect(endState[todolistId1][0].title).toBe('JS');
});

test('Add task', () => {
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
    const newTitleTask = 'New Title'
    const endState = tasksReducer(startState, AddTAsksAC(newTitleTask, todolistId1))

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][0].title).toBe(newTitleTask);
});

test('CHANGE-TASK-STATUS', () => {
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

    const endState = tasksReducer(startState, ChangeTaskStatusAC('1', false, todolistId1))

    expect(endState[todolistId1][0].isDone).toBe(false);
    expect(endState[todolistId1][1].isDone).toBe(true);
});

test('CHANGE-TASK-TITLE', () => {
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
    const newTitle = 'new Title'
    const endState = tasksReducer(startState, ChangeTaskTitleAC('1', newTitle, todolistId1))

    expect(endState[todolistId1][0].title).toBe(newTitle);
    expect(endState[todolistId1][1].title).toBe('JS');
});

