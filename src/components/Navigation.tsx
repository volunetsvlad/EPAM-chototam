import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import logo from "../assets/logo.svg";

export default function Navigation() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <img className={styles.logo} src={logo} alt="App Logo" />
        <div className={styles.navCenter}>
          <div className={styles.navInfo}>You Have<br/>2 tasks here</div>
          <button className={styles.addTaskButton} type="button" onClick={()=>{}}>+ Add Task</button>
        </div>
        <div className={styles.navLinks}>
        <NavLink className={styles.navLink} to="/my-tasks">Tasks</NavLink>
        <NavLink className={styles.navLink} to="/profile">Profile</NavLink>
        <NavLink className={styles.navLink} to="/all-tasks">Common Tasks</NavLink>
        </div>
      </nav>
    </header>
  );
}