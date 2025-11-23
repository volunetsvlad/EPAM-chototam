import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import logo from "../assets/logo.svg";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>

      <img className={styles.logo} src={logo} alt="App Logo" />
      
      <h1 className={styles.title}>Welcome!</h1>

      <form className={styles.form}>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="email">Email</label>
          <input className={styles.input} id="email" type="email" placeholder="" />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="password">Password</label>
          <input className={styles.input} id="password" type="password" placeholder="" />
        </div>

        <button className={styles.formButton} type="submit">Log In</button>

        <button 
          className={styles.formButton}
          type="button"
          onClick={() => navigate("/signup")}
        >
          Go to Sign Up
        </button>

      </form>
    </div>
  );
}
