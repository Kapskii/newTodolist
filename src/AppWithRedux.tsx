import "./App.css";
import { TasksType } from "./components/TodolistWithRedux";
import { AddItemForm } from "./components/AddItemForm";
import { Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Menu } from "@mui/icons-material";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { useDispatch } from "react-redux";
import { TodolistWithRedux } from "./components/TodolistWithRedux";

export type FilterType = "ALL" | "COMPLETED" | "ACTIVE";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskTypeState = {
  [key: string]: Array<TasksType>;
};



function AppWithRedux() {

  let todolists = useSelector<AppRootStateType, Array<TodolistType>>(
    (state) => state.todolist
  );

  let task = useSelector<AppRootStateType, TaskTypeState>(
    (state) => state.tasks
  );

  const dispatch = useDispatch();

  const removeTask = (id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId));
  };

  const filterTasks = (value: FilterType, todolistId: string) => {
    dispatch(ChangeTodolistFilterAC(todolistId, value));
  };

  let addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId));
  };

  let changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
  };

  let changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todolistId));
  };

  const removeTodolist = (todolistId: string) => {
    dispatch(RemoveTodolistAC(todolistId));
  };

  const changeTodolistTitle = (id: string, title: string) => {
    dispatch(ChangeTodolistTitleAC(id, title));
  };

  const addTodolist = (title: string) => {
    dispatch(AddTodolistAC(title));
  };

  return (
    <div className="App">
      <AppBar
        style={{ background: "default", color: "black" }}
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
            return (
              <Grid item>
                <Paper elevation={3} style={{ padding: "20px" }}>
                  <TodolistWithRedux todolist={tl} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
