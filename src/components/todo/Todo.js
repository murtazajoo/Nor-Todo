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
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Todo = React.memo(({ todo, setEditTodo }) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const todoRef = useRef();

  function toggleFav() {
    dispatch(
      updateTodo({
        ...todo,
        fav: todo.fav.includes(user.id)
          ? todo.fav.filter((id) => id !== user.id)
          : [user.id, ...todo.fav],
      })
    );
  }

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
          <ReactLinkify
            componentDecorator={componentDecorator}
            className="whitespace-pre"
          >
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
            {user &&
              (todo.fav.includes(user?.id) ? (
                <BookmarkIcon
                  onClick={toggleFav}
                  sx={{ cursor: "pointer", color: "#379aff", ml: 2 }}
                />
              ) : (
                <BookmarkBorderIcon
                  onClick={toggleFav}
                  sx={{ cursor: "pointer", color: "#379aff", ml: 2 }}
                />
              ))}

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

const componentDecorator = (href, text, key) => (
  <a href={href} key={key} rel="noreferrer" target="_blank">
    {text}
  </a>
);
export default Todo;
