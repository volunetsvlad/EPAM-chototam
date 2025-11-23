import { useNavigate } from "react-router-dom";
import styles from './SignUp.module.css';
import ImageUpload from '../components/ImageUpload';


export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>

      <form className={styles.form}> 
        <ImageUpload />

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="email">Email</label>
          <input className={styles.input} id="email" type="email" placeholder="" />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="name">Name</label>
          <input className={styles.input} id="name" type="text" placeholder="" />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="password">Password</label>
          <input className={styles.input} id="password" type="password" placeholder="" />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="repeatPassword">Repeat password</label>
          <input className={styles.input} id="repeatPassword" type="password" placeholder="" />
        </div>

        <button className={styles.formButton} type="submit">Sign Up</button>

        <button className={styles.formButton} onClick={() => navigate("/signin")}>Go to Sign In</button>
      </form>
    </div>
  );
}