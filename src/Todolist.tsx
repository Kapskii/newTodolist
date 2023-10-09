import React, { ChangeEvent, KeyboardEvent, useState } from "react"
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
    filterTasks: (value: FilterType) => void
    addTask: (title: string) => void
}


export let Todolist = (props: PropsType) => {
    let [newTitle, setNewTitle] = useState("");

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTitle);
            setNewTitle('');
        }
    }

    const onClickHandler = () => {
        props.addTask(newTitle);
        setNewTitle('');
    }

    const allClickHandler = () => props.filterTasks('ALL');
    const activeClickHandler = () => props.filterTasks('ACTIVE');
    const completedClickHandler = () => props.filterTasks('COMPLETED');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(el => {

                        const removeTaskHandler = () => { props.removeTask(el.id) };

                        return <li key={el.id}>
                            <button onClick={removeTaskHandler}>X</button>
                            <input type="checkbox" checked={el.isDone} />
                            <span>{el.title}</span>
                        </li>
                    }
                    )
                }
            </ul>
            <div>
                <button onClick={allClickHandler}>ALL</button>
                <button onClick={activeClickHandler}>ACTIVE</button>
                <button onClick={completedClickHandler}>COMPLETED</button>
            </div>
        </div>
    )
}