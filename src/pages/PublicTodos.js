import { useSelector } from "react-redux";

import Todos from "../components/todo/Todos";
import { selectTodos } from "../features/todo/todoSlice";
import { Typography } from "@mui/material";

function PublicTodo() {
  const { status, data } = useSelector(selectTodos);
  const publicTodos = data.filter((todo) => todo.public);

  return (
    <div className="p-5 max-w-[1440px] m-auto">
      <Typography variant="body2" sx={{ mb: 4 }} className="text-slate-600">
        Explore Todo's made public by others and you
      </Typography>

      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <Todos todos={publicTodos} />
      )}
    </div>
  );
}

export default PublicTodo;
