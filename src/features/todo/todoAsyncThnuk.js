import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabase";

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  let { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw error;
  }
  return todos;
});

export const addTodo = createAsyncThunk("todo/addTodo", async (todo) => {
  const { data, error } = await supabase
    .from("todos")
    .insert([
      {
        ...todo,
        reactions: {
          like: 0,
          dislike: 0,
          rocket: 0,
        },
      },
    ])
    .select();

  if (error) {
    throw error;
  }
  return data[0];
});

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (updatedTodo) => {
    const { data, error } = await supabase
      .from("todos")
      .update(updatedTodo)
      .eq("id", updatedTodo.id)
      .select();
    if (!data) {
      throw new Error("No todo found");
    } else {
      return data[0];
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (todoId) => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq("id", todoId)
      .select();
    if (error) {
      throw error;
    }
    return data[0];
  }
);
