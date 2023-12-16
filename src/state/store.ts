import { combineReducers, legacy_createStore } from "redux";
import { taskReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";

const rootReducer = combineReducers({
  tasks: taskReducer,
  todolist: todolistsReducer,
});

export const store = legacy_createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;

