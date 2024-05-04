import { createSvgIcon } from "@mui/material/utils";

const TASK__TYPE = {
  changed: "changed",
  delete: "delete",
  added: "added",
};

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth={1.0}
    stroke="currentColor"
    color="#2196F3"
  >
    <path d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  "Plus"
);

function inProgressTask(tasks) {
  return tasks.filter((task) => !task.done).length;
}

function doneTask(tasks) {
  return tasks.filter((task) => task.done).length;
}

export { TASK__TYPE, PlusIcon, doneTask, inProgressTask };
