import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import style from "./App.module.css";

function App() {
  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;