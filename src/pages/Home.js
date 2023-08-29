import React from "react";
import Landing from "../components/home/Landing";
import { useUser } from "@supabase/auth-helpers-react";
import MyTodo from "../components/todo/MyTodo";

function Home() {
  const user = useUser();
  return <div>{user ? <MyTodo /> : <Landing />}</div>;
}

export default Home;
