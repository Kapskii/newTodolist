import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    title: string
    onChange: (newValut:string)=>void
}

export let EditableSpan = (props:EditableSpanPropsType) => {
    let[editMode, setEditMode] = useState(false);
    let[title, setTitle] = useState("");


const activateEditMode = ()=>{
    setEditMode(true)
    setTitle(props.title)
}

const activateViewMode = ()=>{
    setEditMode(false)
    props.onChange(title);
}

const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>)=> setTitle(e.currentTarget.value)

return editMode
?<TextField variant={'standard'} value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
:<span onDoubleClick={activateEditMode}>{props.title}</span>
}