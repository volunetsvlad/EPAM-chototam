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
  const [updating, setUpdating] = useState(false);
  const [avatarToDelete, setAvatarToDelete] = useState(false);
  const [nameError, setNameError] = useState('');

  const handleUpdate = async () => {
  setNameError('');
  if (!name || name.trim().length < 2) {
    setNameError('Name must be at least 2 characters');
    return;
  }

  try {
    setUpdating(true);
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/signin');
      return;
    }

    if (avatarToDelete) {
      try {
        await handleDeleteAvatar();
        setAvatarToDelete(false);
      } catch (error) {
        alert('Failed to delete avatar');
        setUpdating(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append('name', name);
    
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    const response = await fetch('https://todo-backend-rpf2.onrender.com/api/users/me', {
      method: 'PUT',
      headers: {
          "Access-Token": token ?? "",
          "Content-Type": "application/json",
      },
      body: formData
    });

    const data = await response.json();

    if (response.status === 401) {
      localStorage.removeItem('token');
      navigate('/signin');
      return;
    }

    if (response.ok) {
      alert('Profile updated successfully!');
      setAvatarFile(null);
}   else {
      let errorMessage = 'Unknown error';
    if (data.error) {
      errorMessage = data.error;
  } else if (data.errors && Array.isArray(data.errors)) {
      errorMessage = data.errors.join(', ');
  }
  alert('Failed to update: ' + errorMessage);
}
  } catch (error) {
    console.error('Update error:', error);
    alert('Error connecting to server');
  } finally {
    setUpdating(false);
  }
};

const handleDeleteAvatar = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/signin');
      return;
    }

    const response = await fetch('https://todo-backend-rpf2.onrender.com/api/users/me/avatar', {
      method: 'DELETE',
      headers: {
          "Access-Token": token ?? "",
          "Content-Type": "application/json",
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      navigate('/signin');
      return;
    }

    if (response.ok) {
      return true;
    } else {
      const data = await response.json();
      throw new Error(data.error || 'Failed to delete avatar');
    }
  } catch (error) {
    console.error('Delete avatar error:', error);
    throw error;
  }
};

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const fetchUserData = async () => {
  try {
    setLoading(true);
    setError('');
    
    const token = localStorage.getItem('token');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('https://todo-backend-rpf2.onrender.com/api/users/me', {
      method: 'GET',
      headers: {
          "Access-Token": token ?? "",
          "Content-Type": "application/json",
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


  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>

        {loading && <p>Loading profile...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}

         {!loading && !error && (
        <> 
        <ImageUpload 
          onFileSelect={(file) => setAvatarFile(file)}
          onDelete={() => setAvatarToDelete(true)}
        />

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input 
            type="email" 
            value={email}
            readOnly
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => {
            setName(e.target.value);
            if (nameError) {
              setNameError('');
            }
          }   }
            className={styles.input}
          />
        </div>
        {nameError && <p style={{color: 'red', fontSize: '12px', marginTop: '-15px'}}>{nameError}</p>}

        <button 
          className={styles.updateButton} 
          onClick={handleUpdate}
          disabled={updating}
        >
        {updating ? 'Updating...' : 'Update'}
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