import React, { useContext } from "react";
import { TaskContext } from "../../context/taskContext";
import { Task } from "../task/Task";

export function ListTask() {
  const tasks = useContext(TaskContext);

  return (
    <div>
      {tasks.map((task) =>
        !task.done ? <Task key={task.id} task={task} /> : null
      )}
    </div>
  );
}
