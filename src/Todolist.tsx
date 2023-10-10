import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterType } from "./App"
import { SuperButton } from "./components/SuperButton"

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
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
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
            props.addTask(newTitle.trim());
            setNewTitle('');
        } 
    }

    const onClickHandler = () => {
        if (newTitle.trim() !== "") {
            props.addTask(newTitle.trim());
            setNewTitle('');
        } else {
            setError('Обязательное поле');
        }
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
                    className={error ? "error" : ""}
                />
                <SuperButton name="+" callBack={onClickHandler} />
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(el => {

                        const removeTaskHandler = () => { props.removeTask(el.id) };
                        const onChangeHandlerInput = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(el.id, e.currentTarget.checked)
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