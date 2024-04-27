import React, { useReducer } from "react";
import AddTask from "./components/addTask/AddTask";
import { Container, Typography } from "@mui/material";
import { ListTask } from "./components/listTask/ListTask";
import { TaskContext, TaskDispatchContext } from "./context/taskContext";
import { ListTaskDone } from "./components/listTaskDone/ListTaskDone";

export default function App() {
  const data = [];

  const [tasks, dispatch] = useReducer(tasksReducer, data);

  function inProgressTask() {
    return tasks.filter((task) => !task.done).length;
  }

  function doneTask() {
    return tasks.filter((task) => task.done).length;
  }
  return (
    <Container>
      <TaskContext.Provider value={tasks}>
        <TaskDispatchContext.Provider value={dispatch}>
          <AddTask />
          {inProgressTask() ? (
            <Typography variant={"h5"}>План ({inProgressTask()})</Typography>
          ) : null}

          <ListTask />

          {doneTask() ? (
            <Typography variant={"h5"}>Готово ({doneTask()})</Typography>
          ) : null}
          <ListTaskDone />
        </TaskDispatchContext.Provider>
      </TaskContext.Provider>
    </Container>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [...tasks, { id: Math.random(), name: action.name, done: false }];
    }
    case "delete": {
      return tasks.filter((task) => task.id !== action.id);
    }
    case "changed": {
      return tasks.map((task) => {
        if (task.id === action.task.id) {
          return action.task;
        } else {
          return task;
        }
      });
    }
    default: {
      console.log("Unknow action.type...");
    }
  }
}
