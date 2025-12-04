import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import logo from "../assets/logo.svg";

export default function Navigation() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <img className={styles.logo} src={logo} alt="App Logo" />
        <div className={styles.navLinks}>
        <NavLink className={styles.navLink} to="/my-tasks">Tasks</NavLink>
        <NavLink className={styles.navLink} to="/profile">Profile</NavLink>
        <NavLink className={styles.navLink} to="/all-tasks">Common Tasks</NavLink>
        </div>
      </nav>
    </header>
  );
}