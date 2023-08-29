import React, { useState } from "react";
import { Box, Chip, Divider, ToggleButton, Typography } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../../features/todo/todoSlice";
import Reactions from "./Reactions";
import EditModal from "./EditModal";
import { getUser } from "../../features/user/userSlice";

function Todos({ todos }) {
  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState(null);
  const user = useSelector(getUser);

  function toggleCompeleted(todo) {
    dispatch(
      updateTodo({
        ...todo,
        completed: !todo.completed,
      })
    );
  }

  function handleDelete(todoId) {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      dispatch(deleteTodo(todoId));
    }
  }

  return (
    <div className="grid place-content-center gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {todos &&
        todos.map((todo) => (
          <div
            className={` ${
              TailWindBgRandomClasses[
                Math.floor(Math.random() * TailWindBgRandomClasses.length)
              ]
            } bg-opacity-40 rounded-2xl p-5 h-fit`}
            key={todo.id}
          >
            <Typography variant="h4" className="">
              {todo.title}
            </Typography>
            <Typography
              variant="body2"
              className="text-md text-slate-400 break-words whitespace-wrap"
            >
              {todo.body}
            </Typography>
            <Divider
              variant="middle"
              sx={{ my: 2 }}
              color={todo.completed ? "success" : "warning"}
            />
            <div className="flex justify-between items-center w-full">
              <Box>
                <Typography variant="body2" className="text-sm text-slate-600">
                  {new Date(todo.created_at).toLocaleDateString()}
                </Typography>
                <Typography variant="body3" className="text-xsm text-sky-900">
                  {todo.edited && "edited"}
                </Typography>
              </Box>

              {user && todo.user_id === user.id && (
                <div className="w-full text-right">
                  <EditNoteOutlinedIcon
                    sx={{ cursor: "pointer", color: "#379aff", mx: 1 }}
                    onClick={() => setEditTodo(todo)}
                  />

                  <DeleteOutlinedIcon
                    onClick={() => handleDelete(todo.id)}
                    sx={{ cursor: "pointer", color: "#379aff" }}
                  />

                  <ToggleButton
                    value="check"
                    selected={todo.completed}
                    color={todo.completed ? "success" : "primary"}
                    sx={{ color: "lightblue", ml: 2 }}
                    onChange={() => {
                      toggleCompeleted(todo);
                    }}
                  >
                    <CheckIcon color={todo.completed ? "success" : "primary"} />
                  </ToggleButton>
                </div>
              )}
            </div>
            {todo.public && <Reactions todo={todo} />}
          </div>
        ))}
      {editTodo && <EditModal todo={editTodo} setEditTodo={setEditTodo} />}
    </div>
  );
}

const TailWindBgRandomClasses = [
  //some tailwind classes of different colors with -800
  "bg-sky-800",
  "bg-rose-800",
  "bg-violet-800",
  "bg-lime-800",
  "bg-amber-800",
  "bg-emerald-800",
];

export default Todos;
