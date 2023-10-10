import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TasksType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterType = 'ALL' | 'COMPLETED' | 'ACTIVE'


function App() {

  let [tasks, setTasks] = useState<Array<TasksType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "REACT", isDone: false },
    { id: v1(), title: "REDUX", isDone: false },
  ]);

  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter(el => el.id !== id)
    setTasks(filteredTasks);
  }


  let [filter, setFilter] = useState<FilterType>("ALL");

  const filterTasks = (value: FilterType) => {
    setFilter(value)
  }


  let taskForList = tasks;
  if (filter === 'COMPLETED') {
    taskForList = tasks.filter(el => el.isDone === true);
  }
  if (filter === 'ACTIVE') {
    taskForList = tasks.filter(el => el.isDone === false);
  }


  let addTask = (title: string) => {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  let changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find(el => el.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    let copy = [...tasks]
    setTasks(copy)
  }

  return (
    <div className="App">
      <Todolist
        title='WHAT TO LEARN'
        tasks={taskForList}
        removeTask={removeTask}
        filterTasks={filterTasks}
        addTask={addTask}
        changeStatus={changeStatus} 
        filter={filter}/>
    </div>
  );
}



export default App;
