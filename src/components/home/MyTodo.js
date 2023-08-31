import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectTodos } from "../../features/todo/todoSlice";
import AddTodo from "../todo/AddTodo";

import TodosList from "../todo/TodosList";
import { Box, Button, Switch, Typography } from "@mui/material";
import { getUser } from "../../features/user/userSlice";

function MyTodo() {
  const [isAddTodo, setIsAddTodo] = useState(false);
  const user = useSelector(getUser);
  const [fav, setfav] = useState(false);
  const {
    status: fetchStatus,
    statusText: fetchStatusText,
    data: todos,
  } = useSelector(selectTodos);

  const userTodos = todos.filter((todo) => {
    if (fav) {
      return todo.fav.includes(user.id);
    } else {
      return todo.user_id === user.id;
    }
  });

  return (
    <div className="px-5 max-w-[1440px] m-auto">
      {/*Add Todo Modal Modal */}
      <AddTodo isAddTodo={isAddTodo} setIsAddTodo={setIsAddTodo} />
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

      <div className="bg-slate-800 px-5 rounded-full mb-5 flex justify-evenly items-center w-fit">
        Favorite Todo
        <Switch onClick={() => setfav(!fav)} />
      </div>
      {fetchStatus === "loading" ? (
        <div>Loading...</div>
      ) : fetchStatus === "error" ? (
        <div>{fetchStatusText} Please Try Reloading the Page</div>
      ) : userTodos.length > 0 ? (
        <TodosList todos={userTodos} />
      ) : (
        <div className="text-center text-slate-600">
          You have no todos yet. Click on the Add Todo button to add one.
        </div>
      )}
    </div>
  );
}

export default MyTodo;
