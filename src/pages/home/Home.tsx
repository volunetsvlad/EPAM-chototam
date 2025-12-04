import TaskItem from "../../components/taskItem/TaskItem";
import styles from './Home.module.css';

export default function Home() {
  return (
  <div className={styles.container}>
    <TaskItem
  title="Title"
  completed={false}
  onToggle={() => console.log("toggle")}
  onDelete={() => console.log("delete")}
  onEdit={() => console.log("edit")}
/>
</div>
  )
}
