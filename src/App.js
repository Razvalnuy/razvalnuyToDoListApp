import React, { useReducer } from "react";
import AddTask from "./components/addTask/AddTask";
import { Container, Typography } from "@mui/material";
import { TaskContext, TaskDispatchContext } from "./context/taskContext";
import { Task } from "./components/task/Task";
import { doneTask, inProgressTask } from "./utils/variables";

export default function App() {
  const defaultArray = [];
  const initalStorage =
    JSON.parse(localStorage.getItem("tasks")) || defaultArray;

  const [tasks, dispatch] = useReducer(tasksReducer, initalStorage);

  return (
    <Container>
      <TaskContext.Provider value={tasks}>
        <TaskDispatchContext.Provider value={dispatch}>
          <AddTask />
          {inProgressTask(tasks) ? (
            <Typography variant={"h5"}>
              План ({inProgressTask(tasks)})
            </Typography>
          ) : null}

          {tasks.map((task) =>
            !task.done ? <Task key={task.id} task={task} /> : null
          )}

          {doneTask(tasks) ? (
            <Typography variant={"h5"}>Готово ({doneTask(tasks)})</Typography>
          ) : null}

          {tasks.map((task) =>
            task.done ? <Task key={task.id} task={task} /> : null
          )}
        </TaskDispatchContext.Provider>
      </TaskContext.Provider>
    </Container>
  );
}

function tasksReducer(tasks, action) {
  const id = Math.floor(Math.random() * 812);

  switch (action.type) {
    case "added": {
      const newTask = [...tasks, { id: id, name: action.name, done: false }];
      localStorage.setItem("tasks", JSON.stringify(newTask));
      return newTask;
    }
    case "delete": {
      const filteredTask = tasks.filter((task) => task.id !== action.id);
      localStorage.setItem("tasks", JSON.stringify(filteredTask));
      return filteredTask;
    }
    case "changed": {
      const findIndex = tasks.findIndex((task) => task.id === action.task.id);

      if (findIndex !== -1) {
        const updateTask = [...tasks];
        updateTask[findIndex] = action.task;
        localStorage.setItem("tasks", JSON.stringify(updateTask));
        return updateTask;
      }
      return;
    }
    default: {
      console.log("Unknow action.type...");
    }
  }
}
