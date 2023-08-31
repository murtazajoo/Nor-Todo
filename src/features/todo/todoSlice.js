import { createSlice } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "./todoAsyncThnuk";
import { toast } from "react-toastify";

export { addTodo, deleteTodo, fetchTodos, updateTodo };
const initialState = {
  data: [],
  status: "idle",
  statusText: "",
};

const toastId = "upadtingtoastid";

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "idle";
      state.data = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "error";
      state.data = [];
      state.statusText = action.error.message;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.status = "added";
      state.data.unshift(action.payload);
    });
    builder.addCase(updateTodo.pending, (state, action) => {
      toast.loading("Syncing Changes ", { toastId: toastId });
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const updatedTodo = action.payload;

      const index = state.data.findIndex((todo) => todo.id === updatedTodo.id);

      if (index !== -1) {
        const newData = [...state.data];
        newData[index] = updatedTodo;

        state.data = newData;
      }

      state.status = "updated";

      toast.update(toastId, {
        render: "Updated Successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    });

    builder.addCase(deleteTodo.pending, (state, action) => {
      toast.loading("Deleting Todo", { toastId: toastId });
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.status = "idle";
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
      toast.update(toastId, {
        render: "Deleted Successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    });
  },
});

export const selectTodos = (state) => state.todo;
export default todoSlice.reducer;
