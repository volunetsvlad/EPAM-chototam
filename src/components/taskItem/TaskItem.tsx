import React from "react";
import styles from "./TaskItem.module.css";
import deleteIcon from "../../assets/deleteIcon.svg";
import editIcon from "../../assets/editIcon.svg";


interface TaskItemProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
        //   checked={completed}
          onChange={onToggle}
          className={styles.checkbox}
        />
        <span className={styles.customCheckbox}></span>
        <span className={styles.title}>{title}</span>
      </label>

      <div className={styles.right}>
        <button onClick={onDelete} className={styles.iconButton}>
          <img
        className={styles.deleteIcon}
        src={deleteIcon}
        alt="Delete Icon"
      />
        </button>

        <button onClick={onEdit} className={styles.iconButton}>
          <img
        className={styles.editIcon}
        src={editIcon}
        alt="Edit Icon"
      />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
