import { useSelector } from "react-redux";

import TodosList from "../components/todo/TodosList";
import { selectTodos } from "../features/todo/todoSlice";
import { Typography } from "@mui/material";

function Explore() {
  const { status, data } = useSelector(selectTodos);
  const publicTodos = data.filter((todo) => todo.public);

  const contributingTodo = publicTodos.find((todo) => todo.id === 59);
  if (contributingTodo) {
    publicTodos.splice(publicTodos.indexOf(contributingTodo), 1);
    publicTodos.unshift(contributingTodo);
  }

  return (
    <div className="p-5 max-w-[1440px] m-auto">
      <Typography variant="body2" sx={{ mb: 4 }} className="text-slate-600">
        Explore Todo's made public by others and you
      </Typography>

      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <TodosList todos={publicTodos} />
      )}
    </div>
  );
}

export default Explore;
