import { useState, useRef, type ChangeEvent } from "react";
import uploadIcon from "../assets/uploadIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";
import styles from "./ImageUpload.module.css";

export default function ImageUpload () {

  const [preview, setPreview] = useState<string>(uploadIcon);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(uploadIcon);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const deleteImage = () => {
    setPreview(uploadIcon);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>

      <input ref={fileInputRef}
        className={styles.hiddenInput}
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <img
        className={styles.preview}
        src={preview}
        alt="Preview"
      />
      <img
        className={styles.editIcon}
        src={editIcon}
        alt="Edit Icon"
        onClick={openFilePicker}
      />
      <img
        className={styles.deleteIcon}
        src={deleteIcon}
        alt="Delete Icon"
        onClick={deleteImage}
      />
    </div>
  );
};
