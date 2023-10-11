import React, { KeyboardEvent, ChangeEvent, useState } from "react";
import { SuperButton } from "./SuperButton";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export let AddItemForm = (props: AddItemFormPropsType) => {
    const [newTitle, setNewTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addItem(newTitle.trim());
            setNewTitle('');
        }
    }

    const addTask = () => {
        if (newTitle.trim() !== "") {
            props.addItem(newTitle.trim());
            setNewTitle('');
        } else {
            setError('Обязательное поле');
        }
    }

    return (
        <div>
            <input value={newTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? "error" : ""}
            />
            <SuperButton name="+" callBack={addTask} />
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}