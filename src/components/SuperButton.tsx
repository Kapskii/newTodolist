import React, { ReactNode } from "react"


type PropsType = {
    name?: string
    callBack: () => void
    children?: ReactNode
}



export let SuperButton: React.FC<PropsType> = (props) => {
    const { name, callBack, children,...otherProps } = props
    return (
        <button onClick={callBack}>{name}</button>
    )
}