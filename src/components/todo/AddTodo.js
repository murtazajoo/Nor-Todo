import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { BasicSwitch } from "../../utils/Switch";
import { useDispatch } from "react-redux";
import { addTodo } from "../../features/todo/todoSlice";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
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
    if (newTodo.title == "" || newTodo.body == "")
      return toast.warn("Some fields are empty", { autoClose: 1000 });
    if (newTodo.title.length > 30) {
      return toast.warn("Title is too long", { autoClose: 1000 });
    }
    if (newTodo.body.length > 300) {
      return toast.warn("Description is too long (>300)", { autoClose: 1000 });
    }
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
        style={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgb(22 ,163, 174, 0.2)",
        }}
      >
        <Box
          sx={style}
          className="flex flex-col text-left w-full max-h-[100vh] gap-5 rounded-3xl bg-green-50"
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
            required
            value={newTodo.title}
            id="outlined-basic"
            name="title"
            label="Title"
            variant="outlined"
            onChange={handleTitleChange}
          />

          <TextareaAutosize
            required
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
