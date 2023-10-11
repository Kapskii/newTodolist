import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterType } from "./App"
import { SuperButton } from "./components/SuperButton"
import { AddItemForm } from "./components/AddItemForm"
import { EditableSpan } from "./components/EditableSpan"


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    filterTasks: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeTitle: (taskId: string, newTitle: string, todolistId: string) => void
}


export let Todolist = (props: PropsType) => {



    const allClickHandler = () => props.filterTasks('ALL', props.id);
    const activeClickHandler = () => props.filterTasks('ACTIVE', props.id);
    const completedClickHandler = () => props.filterTasks('COMPLETED', props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const changeTodolistTitle = (newTitle:string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }



    const addTask = (title:string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><SuperButton name="X" callBack={removeTodolist}/><EditableSpan title={props.title} onChange={changeTodolistTitle}/></h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(el => {

                        const removeTaskHandler = () => { props.removeTask(el.id, props.id) };
                        const onChangeHandlerInput = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(el.id, e.currentTarget.checked, props.id)
                        }
                        
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTitle(el.id, newValue, props.id)
                        }

                        return <li key={el.id} className={el.isDone ? "is-done" : ""}>
                            <SuperButton name="X" callBack={removeTaskHandler} />
                            <input type="checkbox"
                                onChange={onChangeHandlerInput}
                                checked={el.isDone} />
                            <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                        </li>
                    }
                    )
                }
            </ul>
            <div>
                <SuperButton name="ALL" callBack={allClickHandler} />
                <SuperButton name="ACTIVE" callBack={activeClickHandler} />
                <SuperButton name="COMPLETED" callBack={completedClickHandler} />
                {/* <button className={props.filter==='ALL'?"active-filter":''} onClick={allClickHandler}>ALL</button>
                <button className={props.filter==='ACTIVE'?"active-filter":''} onClick={activeClickHandler}>ACTIVE</button>
                <button className={props.filter==='COMPLETED'?"active-filter":''} onClick={completedClickHandler}>COMPLETED</button> */}
            </div>
        </div>
    )
}


