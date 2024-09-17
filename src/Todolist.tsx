import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {ButtonProps} from "@mui/material/Button/Button";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {

    let tasks = props.tasks

    tasks = useMemo(() => {
        if (props.filter === "active") {
            tasks = tasks.filter(t => t.isDone === false);
        }
        if (props.filter === "completed") {
            tasks = tasks.filter(t => t.isDone === true);
        }
        return tasks
    }, [props.tasks, props.filter])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return (
                        <TaskWithRedux key={t.id} task={t} todolistId={props.id}/>
                    )
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <MyButton variant={props.filter === 'all' ? 'outlined' : 'text'}
                      onClick={onAllClickHandler}
                      color={'inherit'}
                      title={'All'}/>

            <MyButton variant={props.filter === 'active' ? 'outlined' : 'text'}
                      onClick={onActiveClickHandler}
                      color={'primary'}
                      title={'Active'}/>

            <MyButton variant={props.filter === 'completed' ? 'outlined' : 'text'}
                      onClick={onCompletedClickHandler}
                      color={'secondary'}
                      title={'Completed'}/>

        </div>
        {/*<ButtonMU id={props.id} filter={props.filter} changeFilter={props.changeFilter}/>*/}
    </div>
})

// type ButtonPropsType = {
//     id: string
//     filter: FilterValuesType
//     changeFilter: (value: FilterValuesType, todolistId: string) => void
// }

// const ButtonMU = memo((props: ButtonPropsType) => {
//     const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
//     const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
//     const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
//     return (
//         <div style={{paddingTop: "10px"}}>
//             <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
//                     onClick={onAllClickHandler}
//                     color={'inherit'}
//             >All
//             </Button>
//             <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
//                     onClick={onActiveClickHandler}
//                     color={'primary'}>Active
//             </Button>
//             <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
//                     onClick={onCompletedClickHandler}
//                     color={'secondary'}>Completed
//             </Button>
//         </div>
//     )
// })

type MyButtonPropsType = {} & ButtonProps
const MyButton = memo(({variant, onClick, color, title}: MyButtonPropsType) => {
    return (
        <Button variant={variant}
                onClick={onClick}
                color={color}>
            {title}
        </Button>
    )
})


