import React from "react"

type PropsType = {
    name?: string
    callBack: ()=>void
}

export let SuperButton = (props:PropsType) => {
    return(
        <button onClick={props.callBack}>{props.name}</button>
    )
}