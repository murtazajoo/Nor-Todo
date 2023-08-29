import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { BasicSwitch } from "./Switch";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../features/todo/todoSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight: "100vh",
  p: 4,
};

export default function EditModal({ todo, setEditTodo }) {
  const dispatch = useDispatch();
  const [updatedTodo, setUpdatedTodo] = React.useState({
    ...todo,
    edited: true,
  });

  function handleTitleChange(e) {
    setUpdatedTodo({
      ...updatedTodo,
      title: e.target.value,
    });
  }

  function handleBodyChange(e) {
    setUpdatedTodo({
      ...updatedTodo,
      body: e.target.value,
    });
  }

  function handlePublicChange() {
    setUpdatedTodo({
      ...updatedTodo,
      public: !updatedTodo.public,
    });
  }

  function handleSave() {
    dispatch(updateTodo(updatedTodo));
    setEditTodo(null);
  }

  return (
    <div>
      <Modal
        open={todo !== null}
        onClose={() => setEditTodo(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="flex flex-col text-left w-full gap-5 rounded-3xl"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center"
          >
            Edit Todo
          </Typography>
          <TextField
            value={updatedTodo.title}
            id="outlined-basic"
            name="title"
            label="Title"
            variant="outlined"
            onChange={handleTitleChange}
          />

          <TextareaAutosize
            name="body"
            onChange={handleBodyChange}
            value={updatedTodo.body}
            className="border border-slate-400 p-2 py-4 rounded-lg"
          />

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="flex  items-center"
          >
            Public
            <BasicSwitch
              onChange={handlePublicChange}
              defaultChecked={updatedTodo.public}
            />
          </Typography>
          <Box className="text-right">
            <Button onClick={() => setEditTodo(null)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
