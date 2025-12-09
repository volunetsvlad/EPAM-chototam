import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import Home from "./pages/home/Home";
import style from "./App.module.css";
import Profile from "./pages/Profile";
import AllTasks from "./pages/AllTasks";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AddTask from "./pages/addtask/AddTask";

function App() {
  return (
    <div className={style.app}>
    <Routes>
      {/* PAGES WITH NAVIGATION */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/all-tasks" element={<AllTasks />} />
        <Route path="/add-task" element={<AddTask />} />
      </Route>

      {/* PAGES WITHOUT NAVIGATION */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>

    </Routes>
    </div>
  );
}

export default App;