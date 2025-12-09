import { useNavigate } from "react-router-dom";
import styles from './SignUp.module.css';
import ImageUpload from '../../components/ImageUpload';
import { useState } from "react";


export default function SignUp() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateForm = () => {
  const newErrors: Record<string, string> = {};

  if (!email) {
    newErrors.email = 'Email is required'; } 
    else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Email is not valid';}
  if (!name) {
    newErrors.name = 'Name is required';  }
    else if (name.length < 2) {
    newErrors.name = 'Name must be at least 2 characters';  }
  if (!password) {    newErrors.password = 'Password is required';  } 
    else if (password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';  }
  if (password !== repeatPassword) {
    newErrors.repeatPassword = 'Passwords do not match';  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

const handleSignUp = async () => {
  if (validateForm()) {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('password', password);

      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      
      const response = await fetch('https://todo-backend-rpf2.onrender.com/api/auth/registration', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Sign up successful!');
        navigate('/');
      } else {
        alert('Sign up failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Sign up error:', error);
      alert('Error connecting to server');
    }
  }
};

  return (
    <div className={styles.container}>
      <form className={styles.form}> 
        <ImageUpload onFileSelect={(file) => setAvatarFile(file)} />

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
          <label className={styles.inputLabel} htmlFor="name">Name</label>
          <input className={styles.input} 
          id="name" 
          type="text" 
          placeholder="" 
          value={name}
          onChange={(e) => {
          setName(e.target.value);
          if (errors.name) {
          setErrors({...errors, name: ''});  }}} />
        </div>
        {errors.name && <p style={{color: 'white', fontSize: '12px', marginTop: '4px'}}>{errors.name}</p>}

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

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="repeatPassword">Repeat password</label>
          <input className={styles.input} 
          id="repeatPassword" 
          type="password" 
          placeholder="" 
          value={repeatPassword}
          onChange={(e) => {
          setRepeatPassword(e.target.value);
          if (errors.repeatPassword) {
          setErrors({...errors, repeatPassword: ''});  }}}/>
        </div>
        {errors.repeatPassword && <p style={{color: 'white', fontSize: '12px', marginTop: '4px'}}>{errors.repeatPassword}</p>}

        <button 
        className={styles.formButton} 
        type="button"
        onClick={handleSignUp}
        >
        Sign Up
        </button>

        <button className={styles.formButton} onClick={() => navigate("/signin")}>Go to Sign In</button>
      </form>
    </div>
  );
}