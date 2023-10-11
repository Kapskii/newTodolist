import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TasksType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import { title } from 'process';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export type FilterType = 'ALL' | 'COMPLETED' | 'ACTIVE'
type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

type TaskTypeState = {
  [key: string]: Array<TasksType>
}



function App() {



  const removeTask = (id: string, todolistId: string) => {
    let task = tasks[todolistId];
    let filteredTasks = task.filter(el => el.id !== id)
    tasks[todolistId] = filteredTasks;
    setTasks({ ...tasks });
  }




  const filterTasks = (value: FilterType, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }


  let addTask = (title: string, todolistId: string) => {
    let newTask = { id: v1(), title: title, isDone: false }
    let task = tasks[todolistId];
    let newTasks = [newTask, ...task];
    tasks[todolistId] = newTasks;
    setTasks({ ...tasks });
  }



  let changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    let task = tasks[todolistId];
    let task1 = task.find(el => el.id === taskId);
    if (task1) {
      task1.isDone = isDone;
      setTasks({ ...tasks })
    }
  }

  let changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    let task = tasks[todolistId];
    let task1 = task.find(el => el.id === taskId);
    if (task1) {
      task1.title = newTitle;
      setTasks({ ...tasks })
    }
  }

  let todolist1 = v1();
  let todolist2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolist1, title: "What to learn", filter: "ALL" },
    { id: todolist2, title: "What to buy", filter: "ALL" },
  ])

  const removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(td => td.id !== todolistId)
    setTodolists(filteredTodolist);
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    const todolist = todolists.find(el => el.id === todolistId)
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }


  let [tasks, setTasks] = useState<TaskTypeState>({
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
    ]
  })

  const addTodolist = (title: string) => {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'ALL',
      title: title

    }
    setTodolists([todolist, ...todolists]);
    setTasks({ ...tasks, [todolist.id]: [] })
  }

  return (

    <div className="App">
      <AppBar position="static" color="secondary">
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
        <Grid container style={ {padding: "15px"} }>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={10}>
          {
            todolists.map(tl => {
              let taskForList = tasks[tl.id];
              if (tl.filter === 'COMPLETED') {
                taskForList = taskForList.filter(el => el.isDone === true);
              }
              if (tl.filter === 'ACTIVE') {
                taskForList = taskForList.filter(el => el.isDone === false);
              }

              return (
                <Grid item >
                  <Paper elevation={3} style={ {padding: "15px"} }>
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
                  filter={tl.filter} />
                  </Paper>
                  </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </div>
  );
}



export default App;
