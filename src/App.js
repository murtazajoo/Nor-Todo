import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import store from "./app/store";
import { fetchTodos, selectTodos } from "./features/todo/todoSlice";
import { fetchUser } from "./features/user/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import About from "./pages/About";
import Explore from "./pages/Explore";

store.dispatch(fetchUser());
store.dispatch(fetchTodos());

function App() {
  const audioRef = useRef();
  const todos = useSelector(selectTodos);
  useEffect(() => {
    if (todos.status === "updated" || todos.status === "added") {
      audioRef?.current && audioRef.current.play();
    }
  }, [todos]);

  return (
    <div className="App bg-slate-950 min-h-[100vh] text-slate-100 pb-20">
      <header className="App-header">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/auth/*">
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/about" element={<About />}></Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </header>
      <ToastContainer />
      <audio ref={audioRef} className="audio-element">
        <source src="https://cdn.pixabay.com/audio/2022/10/30/audio_6634b0add4.mp3"></source>
      </audio>
    </div>
  );
}

export default App;
