import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyTodo from "./pages/MyTodo";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import store from "./app/store";
import { fetchTodos } from "./features/todo/todoSlice";
import { fetchUser } from "./features/user/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicTodo from "./pages/PublicTodos";
import PageNotFound from "./pages/PageNotFound";
import { useUser } from "@supabase/auth-helpers-react";
//initiate dotenv
store.dispatch(fetchUser());
store.dispatch(fetchTodos());

function App() {
  const user = useUser();
  return (
    <div className="App bg-slate-950 min-h-[100vh] text-slate-100">
      <header className="App-header">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {user && <Route path="/mytodo" element={<MyTodo />} />}
          <Route path="/publictodo" element={<PublicTodo />} />
          <Route path="/auth/*">
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
