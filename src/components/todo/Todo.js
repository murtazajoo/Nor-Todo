import React, { useRef } from "react";
import { Box, Divider, ToggleButton, Typography } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "../../features/todo/todoSlice";
import Reactions from "./Reactions";
import { getUser } from "../../features/user/userSlice";
import ReactLinkify from "react-linkify";
import PushPinIcon from "@mui/icons-material/PushPin";

const Todo = React.memo(({ todo, setEditTodo }) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const todoRef = useRef();

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
      todoRef.current.classList.add("rotate-scale-down");
      setTimeout(() => {
        todoRef.current.classList.add("opacity-0");
        dispatch(deleteTodo(todoId));
      }, 300);
    }
  }
  const index = Math.floor(Math.random() * TailWindBgRandomClasses.length);

  return (
    <>
      <div
        ref={todoRef}
        className={` ${TailWindBgRandomClasses[index]} swing-bottom-right-bck bg-opacity-40 rounded-2xl p-5 h-fit`}
        key={todo.id}
      >
        {todo.id === 59 && (
          <div className="absolute bg-rose-800 px-2 pr-4 uppercase rounded-full top-0 left-1/2 transform -rotate-[0deg] -translate-x-1/2 -translate-y-1/2">
            <PushPinIcon sx={{ color: "#379aff" }} /> pinned
          </div>
        )}

        <Typography
          variant="h4"
          className="whitespace-wrap break-words"
          sx={{ mb: 1 }}
        >
          {todo.title}
        </Typography>
        <Typography
          variant="body2"
          className="max-h-[200px] overflow-auto todo-scrollbar pr-1 text-md description whitespace-pre-wrap w-100%  text-slate-400 break-words "
        >
          <ReactLinkify className="whitespace-pre">
            {todo.body
              .split("\n")
              .filter((line) => line.trim() !== "")
              .join("\n")}
          </ReactLinkify>
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
    </>
  );
});

const TailWindBgRandomClasses = [
  //some tailwind classes of different colors with -800
  "bg-sky-800",
  "bg-rose-800",
  "bg-violet-800",
  "bg-lime-800",
  "bg-amber-800",
  "bg-emerald-800",
];
export default Todo;
