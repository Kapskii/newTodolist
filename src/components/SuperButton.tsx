import { Button, ButtonProps } from "@mui/material"
import React, { ReactNode } from "react"


type PropsType = ButtonProps & {
    name?: string
    callBack: () => void
    children?: ReactNode
}



export let SuperButton: React.FC<PropsType> = (props) => {
    const { name, callBack, variant, children, ...otherProps } = props
    return (
        <Button onClick={callBack}
            variant={variant ? variant : 'contained'}
            size={'small'}
            {...otherProps}>
            {name}
        </Button>
    )
}