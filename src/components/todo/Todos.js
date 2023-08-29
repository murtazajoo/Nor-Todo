import React, { useState } from "react";

import EditModal from "./EditModal";
import Todo from "./Todo";

function Todos({ todos }) {
  const [editTodo, setEditTodo] = useState(null);
  return (
    <div className="grid place-content-center gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {todos &&
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} setEditTodo={setEditTodo} />
        ))}
      {editTodo && <EditModal todo={editTodo} setEditTodo={setEditTodo} />}
    </div>
  );
}

export default Todos;
