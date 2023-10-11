import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterType } from "./App"
import { SuperButton } from "./components/SuperButton"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title?: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId:string) => void
    filterTasks: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId:string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
}


export let Todolist = (props: PropsType) => {
    let [newTitle, setNewTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(newTitle.trim(), props.id);
            setNewTitle('');
        } 
    }

    const onClickHandler = () => {
        if (newTitle.trim() !== "") {
            props.addTask(newTitle.trim(), props.id);
            setNewTitle('');
        } else {
            setError('Обязательное поле');
        }
    }

    const allClickHandler = () => props.filterTasks('ALL', props.id);
    const activeClickHandler = () => props.filterTasks('ACTIVE', props.id);
    const completedClickHandler = () => props.filterTasks('COMPLETED', props.id);
const removeTodolist = () => {
    props.removeTodolist(props.id);
}


    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>X</button></h3>
            <div>
                <input value={newTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? "error" : ""}
                />
                <SuperButton name="+" callBack={onClickHandler} />
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(el => {

                        const removeTaskHandler = () => { props.removeTask(el.id, props.id) };
                        const onChangeHandlerInput = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(el.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={el.id} className={el.isDone ? "is-done" : ""}>
                            <SuperButton name="X" callBack={removeTaskHandler} />
                            <input type="checkbox"
                                onChange={onChangeHandlerInput}
                                checked={el.isDone} />
                            <span>{el.title}</span>
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