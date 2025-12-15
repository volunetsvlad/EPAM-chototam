import { useEffect, useState } from "react";
import TaskItem from "../../components/taskItem/TaskItem";
import styles from './Home.module.css';

interface Task {
  id: string;
  title: string;
  done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const tasksCount = tasks.length;

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetch("https://backend-project-cgl3.onrender.com/api/tasks", {
       headers: {
        "Content-Type": "application/json",
        "Access-Token": token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setTasks(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (taskId: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch(
        `https://backend-project-cgl3.onrender.com/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: { "Access-Token": token ?? "" },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      } else {
        alert(data.error || "Failed to delete task");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const handleToggle = async (taskId: string, current: boolean) => {
    try {
      const res = await fetch(
        `https://backend-project-cgl3.onrender.com/api/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Access-Token": token ?? "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ done: !current }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, done: !current } : t))
        );
      } else {
        alert(data.error || "Failed to update task");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tasksInfo}>
        You Have {tasksCount} task{tasksCount !== 1 ? "s" : ""} here
      </div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          title={task.title}
          completed={task.done}
          onToggle={() => handleToggle(task.id, task.done)}
          onDelete={() => handleDelete(task.id)}
          onEdit={() => console.log("edit", task.id)}
        />
      ))}
    </div>
  );
}
