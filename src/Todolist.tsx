import React from "react"
import { FilterType } from "./App"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title?: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    filterTasks: (value:FilterType) => void
}



export let Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" />
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(el => <li><button onClick={ () => {   props.removeTask(el.id) } }>X</button><input type="checkbox" checked={el.isDone}/><span>{el.title}</span></li>)
                }
            </ul>
            <div>
                <button onClick={()=>{props.filterTasks('ALL')}}>ALL</button>
                <button onClick={()=>{props.filterTasks('ACTIVE')}}>ACTIVE</button>
                <button onClick={()=>{props.filterTasks('COMPLETED')}}>COMPLETED</button>
            </div>
        </div>
    )
}