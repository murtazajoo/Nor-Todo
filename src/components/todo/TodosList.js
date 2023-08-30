import React, { useState } from "react";

import EditTodo from "./EditTodo";
import Todo from "./Todo";

function TodosList({ todos }) {
  const [editTodo, setEditTodo] = useState(null);
  return (
    <div className="grid place-content-center gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {todos &&
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} setEditTodo={setEditTodo} />
        ))}
      {editTodo && <EditTodo todo={editTodo} setEditTodo={setEditTodo} />}
    </div>
  );
}

export default TodosList;
