import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterType } from "./App"
import { SuperButton } from "./components/SuperButton"
import { AddItemForm } from "./components/AddItemForm"
import { EditableSpan } from "./components/EditableSpan"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"


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

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }
    
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const getButtonColor = (filterValue: string) => {
        return props.filter === filterValue ? 'secondary' : 'primary'
    }

    return (
        <div>
            <h3><IconButton onClick={removeTodolist} size="small">
                <Delete />
            </IconButton><EditableSpan title={props.title} onChange={changeTodolistTitle} /></h3>

            <AddItemForm addItem={addTask} />
            <div>
                {
                    props.tasks.map(el => {

                        const removeTaskHandler = () => { props.removeTask(el.id, props.id) };
                        const onChangeHandlerInput = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(el.id, e.currentTarget.checked, props.id)
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTitle(el.id, newValue, props.id)
                        }

                        return <div key={el.id} className={el.isDone ? "is-done" : ""}>
                            <IconButton onClick={removeTaskHandler} size="small">
                                <Delete />
                            </IconButton>
                            <Checkbox onChange={onChangeHandlerInput} checked={el.isDone} />
                            <EditableSpan title={el.title} onChange={onChangeTitleHandler} />
                        </div>
                    }
                    )
                }
            </div>
            <div>
                <SuperButton  name="ALL" callBack={allClickHandler} color={getButtonColor('ALL')} />
                <SuperButton name="ACTIVE" callBack={activeClickHandler} color={getButtonColor('ACTIVE')} />
                <SuperButton name="COMPLETED" callBack={completedClickHandler} color={getButtonColor('COMPLETED')} />
            </div>
        </div>
    )
}


