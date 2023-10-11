import React, { KeyboardEvent, ChangeEvent, useState } from "react";
import { SuperButton } from "./SuperButton";
import { IconButton, TextField } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

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
            <TextField value={newTitle}
            label={'Type value'}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton  onClick={addTask}> 
            <AddCircle/>
            </IconButton>
            
        </div>
    )
}