import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createSvgIcon } from "@mui/material/utils";
import { useContext, useState } from "react";
import { TaskDispatchContext } from "../../context/taskContext";

export default function AddTask() {
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
  const defaultText = "";
  const [text, setText] = useState(defaultText);
  const dispatch = useContext(TaskDispatchContext);

  return (
    <Box>
      <Typography
        component="h2"
        color={"#2196F3"}
        fontSize={"34px"}
        paddingBottom={"15px"}
      >
        TODO
      </Typography>
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
        id="standard-basic"
        label="Имя новой задачи"
        variant="standard"
        sx={{ width: "100%" }}
        InputProps={{
          endAdornment: (
            <Button
              disabled={!text.trim()}
              onClick={() => {
                setText(defaultText);
                dispatch({
                  type: "added",
                  name: text,
                });
              }}
            >
              <PlusIcon />
            </Button>
          ),
        }}
      ></TextField>
    </Box>
  );
}
