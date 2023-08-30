import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { BasicSwitch } from "../../utils/Switch";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../features/todo/todoSlice";
import { toast } from "react-toastify";
import { MedicalServicesSharp } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  boxShadow: 24,
  maxHeight: "100vh",
  p: 4,
};

export default function EditTodo({ todo, setEditTodo }) {
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
    if (updatedTodo.title == "" || updatedTodo.body == "")
      return toast.warn("Some fields are empty", { autoClose: 1000 });
    if (updatedTodo.title.length > 30) {
      return toast.warn("Title is too long", { autoClose: 1000 });
    }
    if (updatedTodo.body.length > 300) {
      return toast.warn("Description is too long ( > 300 )", {
        autoClose: 1000,
      });
    }
    dispatch(updateTodo(updatedTodo));
    setEditTodo(null);
  }

  return (
    <>
      <Modal
        open={todo !== null}
        onClose={() => setEditTodo(null)}
        aria-labelledby="modal-modal-Edit"
        aria-describedby="modal-modal-Edit"
        style={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(247, 118, 50,0.1)",
        }}
      >
        <Box
          sx={style}
          className="flex flex-col text-left w-full gap-5 rounded-3xl bg-rose-100"
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
    </>
  );
}
