import React, { useReducer } from "react";
import "./App.css";
import { TasksType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import { Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Menu } from "@mui/icons-material";
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer } from "./state/tasks-reducer";

export type FilterType = "ALL" | "COMPLETED" | "ACTIVE";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskTypeState = {
  [key: string]: Array<TasksType>;
};

function AppWithReducer() {
  let todolist1 = v1();
  let todolist2 = v1();

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolist1, title: "What to learn", filter: "ALL" },
    { id: todolist2, title: "What to buy", filter: "ALL" },
  ]);

  let [tasks, dispatchToTasks] = useReducer(taskReducer,{
    [todolist1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "REACT", isDone: false },
      { id: v1(), title: "REDUX", isDone: false },
    ],
    [todolist2]: [
      { id: v1(), title: "TEA", isDone: false },
      { id: v1(), title: "COFFEE", isDone: true },
      { id: v1(), title: "MILK", isDone: false },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    dispatchToTasks(removeTaskAC(id, todolistId))
  };

  const filterTasks = (value: FilterType, todolistId: string) => {
    dispatchToTodolists(ChangeTodolistFilterAC(todolistId, value))
  };

  let addTask = (title: string, todolistId: string) => {
    dispatchToTasks(addTaskAC(title, todolistId))
  };

  let changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistId))
  };

  let changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    dispatchToTasks(changeTaskTitleAC(taskId, title, todolistId))
  };

  const removeTodolist = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  };

  const changeTodolistTitle = (id: string, title: string) => {
    dispatchToTodolists(ChangeTodolistTitleAC(id, title))
  };

  const addTodolist = (title: string) => {
    const action = AddTodolistAC(title)
    dispatchToTodolists(action)
   dispatchToTasks(action)
  };

  return (
    <div className="App">
      <AppBar
        style={{ background: "whitesmoke", color: "black" }}
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODOLIST
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "15px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={10}>
          {todolists.map((tl) => {
            let taskForList = tasks[tl.id];
            if (tl.filter === "COMPLETED") {
              taskForList = taskForList.filter((el) => el.isDone === true);
            }
            if (tl.filter === "ACTIVE") {
              taskForList = taskForList.filter((el) => el.isDone === false);
            }

            return (
              <Grid item>
                <Paper elevation={3} style={{ padding: "15px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForList}
                    removeTask={removeTask}
                    filterTasks={filterTasks}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTitle={changeTaskTitle}
                    filter={tl.filter}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
