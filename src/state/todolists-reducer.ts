import { v1 } from "uuid";
import { FilterType, TodolistType } from "../AppWithRedux";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  id: string;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;


const initialState: Array<TodolistType> = [];

export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistType> => {
  // debugger
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((e) => e.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        {
          id: action.id,
          title: action.title,
          filter: "ALL",
        },
        ...state,
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((el) => el.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find((el) => el.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }
    default:
      return state;
  }
};

export const RemoveTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title, id: v1() };
};

export const ChangeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", title: title, id: id };
};

export const ChangeTodolistFilterAC = (
  id: string,
  filter: FilterType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id };
};
