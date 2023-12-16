import React, { ChangeEvent } from "react";
import { FilterType, TaskTypeState, TodolistType } from "./App";
import { SuperButton } from "./components/SuperButton";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import {addTaskAC,changeTaskStatusAC,changeTaskTitleAC,removeTaskAC,} from "./state/tasks-reducer";
import {ChangeTodolistFilterAC,ChangeTodolistTitleAC,RemoveTodolistAC,} from "./state/todolists-reducer";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolist: TodolistType;
};

export let TodolistWithRedux = ({ todolist }: PropsType) => {


  const { id, title, filter } = todolist;
  let tasks = useSelector<AppRootStateType, Array<TasksType>>(
    (state) => state.tasks[id]
  );

  const dispatch = useDispatch();

  const allClickHandler = () => dispatch(ChangeTodolistFilterAC(id, "ALL"));
  const activeClickHandler = () => ChangeTodolistFilterAC(id, "ACTIVE");
  const completedClickHandler = () => ChangeTodolistFilterAC(id, "COMPLETED");

  if (filter === "COMPLETED") {
    tasks = tasks.filter((el) => el.isDone === true);
  }
  if (filter === "ACTIVE") {
    tasks = tasks.filter((el) => el.isDone === false);
  }

  const removeTodolist = () => {
    dispatch(RemoveTodolistAC(id));
  };

  const changeTodolistTitle = (newTitle: string) => {
    dispatch(ChangeTodolistTitleAC(id, title));
  };

  const addTask = (title: string) => {
    dispatch(addTaskAC(title, id));
  };

  const getButtonColor = (filterValue: string) => {
    return filter === filterValue ? "secondary" : "primary";
  };


  return (
    <div>
      <h3>
        <IconButton onClick={removeTodolist} size="small">
          <Delete />
        </IconButton>
        <EditableSpan title={title} onChange={changeTodolistTitle} />
      </h3>

      <AddItemForm addItem={addTask} />

      
      <div>
        {tasks.map((el) => {
          const removeTaskHandler = () => dispatch(removeTaskAC(el.id, id));

          const onChangeHandlerInput = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(el.id, e.currentTarget.checked, id));
          };

          const onChangeTitleHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(el.id, newValue, id));
          };

          return (
            <div key={el.id} className={el.isDone ? "is-done" : ""}>
              <IconButton onClick={removeTaskHandler} size="small">
                <Delete />
              </IconButton>
              <Checkbox onChange={onChangeHandlerInput} checked={el.isDone} />
              <EditableSpan title={el.title} onChange={onChangeTitleHandler} />
            </div>
          );
        })}
      </div>
      <div>
        <SuperButton
          name="ALL"
          callBack={allClickHandler}
          color={getButtonColor("ALL")}
        />
        <SuperButton
          name="ACTIVE"
          callBack={activeClickHandler}
          color={getButtonColor("ACTIVE")}
        />
        <SuperButton
          name="COMPLETED"
          callBack={completedClickHandler}
          color={getButtonColor("COMPLETED")}
        />
      </div>
    </div>
  );
};
