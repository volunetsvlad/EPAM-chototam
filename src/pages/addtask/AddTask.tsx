import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './AddTask.module.css';

export default function AddTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://backend-project-cgl3.onrender.com/api/tasks/all?page=1&tasksPerPage=100", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Fetched tasks:", data);
      } else {
        console.error("Error fetching tasks:", data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return alert("Title is required");

    try {
      const res = await fetch("https://backend-project-cgl3.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description
        })
      });

      const data = await res.json();

      if (res.ok) {
        setTitle("");
        setDescription("");
        fetchTasks();
        navigate('/');
      } else {
        alert(`Error: ${data.error || data.errors?.join(", ")}`);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Task Title</label>
        <input
          className={styles.input}
          type="text"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Task Description</label>
        <textarea
          className={styles.description}
          placeholder=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        className={styles.addTaskButton}
        type="button"
        onClick={addTask}
      >
        Save
      </button>
    </div>
  );
}