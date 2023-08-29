import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { BasicSwitch } from "./Switch";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/todo/todoSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  // bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ isAddTodo, setIsAddTodo }) {
  const dispatch = useDispatch();
  const initial = {
    title: "",
    body: "",
    public: false,
  };
  const [newTodo, setNewTodo] = React.useState(initial);

  function handleTitleChange(e) {
    setNewTodo({
      ...newTodo,
      title: e.target.value,
    });
  }

  function handleBodyChange(e) {
    setNewTodo({
      ...newTodo,
      body: e.target.value,
    });
  }

  function handlePublicChange() {
    setNewTodo({
      ...newTodo,
      public: !newTodo.public,
    });
  }

  function handleSave() {
    dispatch(addTodo(newTodo));
    setNewTodo(initial);
    setIsAddTodo(null);
  }

  return (
    <div>
      <Modal
        open={isAddTodo}
        onClose={() => setIsAddTodo(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="flex flex-col text-left w-full gap-5 rounded-3xl bg-slate-200"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center"
          >
            Add Todo
          </Typography>
          <TextField
            value={newTodo.title}
            id="outlined-basic"
            name="title"
            label="Title"
            variant="outlined"
            onChange={handleTitleChange}
          />

          <TextareaAutosize
            placeholder="Description"
            name="body"
            onChange={handleBodyChange}
            value={newTodo.body}
            className="border border-slate-400 p-2 py-4 rounded-lg bg-transparent"
          />

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="flex  items-center"
          >
            Public
            <BasicSwitch
              onChange={handlePublicChange}
              defaultChecked={newTodo.public}
            />
          </Typography>
          <Box className="text-right">
            <Button
              onClick={() => {
                setNewTodo(initial);
                setIsAddTodo(false);
              }}
            >
              Discard
            </Button>
            <Button onClick={handleSave} variant="contained">
              Add Todo
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
