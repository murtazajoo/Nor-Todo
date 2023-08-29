import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectTodos } from "../../features/todo/todoSlice";
import AddTodo from "./AddTodo";

import Todos from "./Todos";
import { Badge, Box, Button, Typography } from "@mui/material";
import { getUser } from "../../features/user/userSlice";

function MyTodo() {
  const [isAddTodo, setIsAddTodo] = useState(false);
  const user = useSelector(getUser);
  const {
    status: fetchStatus,
    statusText: fetchStatusText,
    data: todos,
    updateStatus,
  } = useSelector(selectTodos);

  //filter todos to show only userTodos
  const userTodos = todos.filter((todo) => todo.user_id === user.id);

  return (
    <div className="px-5 max-w-[1440px] m-auto">
      <Button
        sx={{ my: 5, padding: "20px 50px" }}
        variant="contained"
        size="large"
        onClick={() => setIsAddTodo(true)}
      >
        Add Todo
      </Button>
      <Typography variant="body2" sx={{ mb: 4 }} className="text-slate-600">
        Your Todo's both public and private
      </Typography>

      <AddTodo isAddTodo={isAddTodo} setIsAddTodo={setIsAddTodo} />
      {fetchStatus === "loading" ? (
        <div>Loading...</div>
      ) : fetchStatus === "error" ? (
        <div>{fetchStatusText}</div>
      ) : (
        <Todos todos={userTodos} />
      )}
    </div>
  );
}

export default MyTodo;
