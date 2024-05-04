import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { TaskDispatchContext } from "../../context/taskContext";
import { TASK__TYPE } from "../../utils/variables";

export function Task({ task }) {
  const dispatch = useContext(TaskDispatchContext);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Checkbox
          checked={task.done}
          onChange={(event) => {
            dispatch({
              type: TASK__TYPE.changed,
              task: {
                ...task,
                done: event.target.checked,
              },
            });
          }}
        />
        {isEdit ? (
          <TextField
            variant="standard"
            sx={{ maxWidth: "950px" }}
            value={task.name}
            label={"Редактирование задачи"}
            onChange={(event) => {
              dispatch({
                type: TASK__TYPE.changed,
                task: {
                  ...task,
                  name: event.target.value,
                },
              });
            }}
          ></TextField>
        ) : (
          <Typography sx={{ display: "inline-block" }}>
            {task.name}
          </Typography>
        )}
      </Box>
      <Box sx={{ alignItems: "center" }}>
        {!task.done ? (
          <IconButton
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            <Edit sx={{ color: "#028881" }} />
          </IconButton>
        ) : null}

        <IconButton
          onClick={() =>
            dispatch({
              type: TASK__TYPE.delete,
              id: task.id,
            })
          }
        >
          <Delete sx={{ color: "#ED6C02" }} />
        </IconButton>
      </Box>
    </ListItem>
  );
}
