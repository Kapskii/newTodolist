
import { v1 } from "uuid"
import { FilterType, TodolistType } from "../App"

export type RemoveTodolistActionTipe = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodolistActionActionType = {
    type: "ADD-TODOLIST",
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterType
}

type ActionsType = RemoveTodolistActionTipe
    | AddTodolistActionActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(e => e.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'ALL'
            }]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(el => el.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(el => el.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionTipe => {
    return { type: "REMOVE-TODOLIST", id: todolistId }
}

export const AddTodolistAC = (title: string): AddTodolistActionActionType => {
    return { type: "ADD-TODOLIST", title: title }
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", title: title, id: id }
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id }
}