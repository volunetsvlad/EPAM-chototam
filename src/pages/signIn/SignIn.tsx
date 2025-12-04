import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import logo from "../../assets/logo.svg";
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateForm = () => {
  const newErrors: Record<string, string> = {};

  if (!email) {
    newErrors.email = 'Email is required'; } 
    else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Email is not valid';}
  if (!password) {    newErrors.password = 'Password is required';  } 
    else if (password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

  const handleSignIn = async () => {
  if (validateForm()) {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Success! Save the token and redirect
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/'); // Redirect to home page
      } else {
        // Failed - show error
        setErrors({...errors, password: data.error || 'Invalid email or password'});
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error connecting to server');
    }
  }
};

  return (
    <div className={styles.container}>

      <img className={styles.logo} src={logo} alt="App Logo" />
      
      <h1 className={styles.title}>Welcome!</h1>

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="email">Email</label>
          <input className={styles.input} 
          id="email" 
          type="email" 
          placeholder=""
          value={email}
          onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) {
          setErrors({...errors, email: ''});  }}} />
        </div>
        {errors.email && <p style={{color: 'white', fontSize: '12px', marginTop: '4px'}}>{errors.email}</p>}

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="password">Password</label>
          <input className={styles.input} 
          id="password" 
          type="password" 
          placeholder="" 
          value={password}
          onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) {
          setErrors({...errors, password: ''});  }}}/>
        </div>
        {errors.password && <p style={{color: 'white', fontSize: '12px', marginTop: '4px'}}>{errors.password}</p>}

        <button className={styles.formButton} type="button" onClick={handleSignIn}>Log In</button>

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
