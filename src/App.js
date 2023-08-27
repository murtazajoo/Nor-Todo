import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyTodo from "./pages/MyTodo";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="App bg-slate-950 min-h-[100vh] text-slate-100">
      <header className="App-header">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mytodo" element={<MyTodo />} />
          <Route path="/auth/*">
            <Route path=":signin" element={<SignIn />} />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
