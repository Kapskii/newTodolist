import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TasksType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterType = 'ALL' | 'COMPLETED' | 'ACTIVE'
type TodolistType = {
  id: string
  title: string
  filter: FilterType
}



function App() {



  const removeTask = (id: string, todolistId: string) => {
    let task = tasks[todolistId];
    let filteredTasks = task.filter(el => el.id !== id)
    tasks[todolistId] = filteredTasks;
    setTasks({...tasks});
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
    let newTasks = [newTask, ...task ];
    tasks[todolistId] = newTasks;
    setTasks({...tasks});
  }


  
  let changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    let task = tasks[todolistId];
    let task1 = task.find(el => el.id === taskId);
    if (task1) {
      task1.isDone = isDone;
      setTasks({...tasks})
    }
    
  }

  let todolist1 = v1();
  let todolist2 = v1();

  let [todolists, setTodolists]  = useState<Array<TodolistType>>([
    {id: todolist1, title: "What to learn", filter: "ALL"},
    {id: todolist2, title: "What to buy", filter: "ALL"},
  ])

const removeTodolist = (todolistId:string) => {
  let filteredTodolist = todolists.filter(td => td.id !== todolistId)
  setTodolists(filteredTodolist);
  delete tasks[todolistId]
  setTasks({...tasks})
}


  let [tasks, setTasks] = useState({
      [todolist1] : [
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "REACT", isDone: false },
        { id: v1(), title: "REDUX", isDone: false },
      ],
      [todolist2] : [
        { id: v1(), title: "TEA", isDone: false },
        { id: v1(), title: "COFFEE", isDone: true },
        { id: v1(), title: "MILK", isDone: false },
      ]
  })

  return (
    <div className="App">
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
            filter={tl.filter}/>
          )
        })
      }
    </div>
  );
}



export default App;
