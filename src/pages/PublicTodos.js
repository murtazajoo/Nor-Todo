import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddTodo from "../components/todo/AddTodo";

import Todos from "../components/todo/Todos";
import { Button } from "@mui/material";
import { selectTodos } from "../features/todo/todoSlice";

function PublicTodo() {
  const [isAddTodo, setIsAddTodo] = useState(false);
  const { status, data } = useSelector(selectTodos);

  const publicTodos = data.filter((todo) => todo.public);

  return (
    <div className="p-5 max-w-[1440px] m-auto">
      {/* <Button
        sx={{ my: 5 }}
        variant="contained"
        onClick={() => setIsAddTodo(true)}
        className="my-5"
      >
        Add Todo
      </Button> */}
      <AddTodo isAddTodo={isAddTodo} setIsAddTodo={setIsAddTodo} />
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <Todos todos={publicTodos} />
      )}
    </div>
  );
}

export default PublicTodo;
