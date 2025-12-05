import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload.tsx";
import styles from "./Profile.module.css";

export default function Profile() {
  const navigate = useNavigate();
  

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/signin');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    const response = await fetch('http://localhost:3000/api/users/me', {
      method: 'PUT', 
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert('Profile updated successfully!');
    } else {
      alert('Failed to update: ' + (data.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('Update error:', error);
    alert('Error connecting to server');
  }
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };


  //Це для loading..., приберіть символи коментарів щоб активувати бо там треба щоб працював сервер
  /*
  const fetchUserData = async () => {
  try {
    setLoading(true);
    setError('');
    
    const token = localStorage.getItem('token');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('http://localhost:3000/api/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (response.status === 401) {
      localStorage.removeItem('token');
      navigate('/signin');
      return;
    }

    if (response.status === 500) {
      setError('Server error. Please try again later.');
      setLoading(false);
      return;
    }

    if (response.ok) {
      setEmail(data.email || '');
      setName(data.name || '');
      setLoading(false);
    } else {
      setError(data.error || 'Failed to load profile');
      setLoading(false);
    }

  } catch (err) {
    setError('Cannot connect to server. Please try again later.');
    setLoading(false);
  }
};

    useEffect(() => {
  fetchUserData();
}, []);
*/


  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>

        {loading && <p>Loading profile...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}

         {!loading && !error && (
        <> 
        <ImageUpload onFileSelect={(file) => setAvatarFile(file)} />

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>

        <button className={styles.updateButton} onClick={handleUpdate}>
          Update
        </button>

        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
            
      </>
         )}
         </div>
    </div>
  );
};