import { useState, useRef, type ChangeEvent } from "react";
import uploadIcon from "../assets/uploadIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";
import styles from "./ImageUpload.module.css";

export default function ImageUpload ({ 
  onFileSelect, 
  onDelete 
}: { 
  onFileSelect: (file: File | null) => void;
  onDelete?: () => void;
}) {
  const [preview, setPreview] = useState<string>(uploadIcon);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(uploadIcon);
      return;
    }

  const validFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
  if (!fileExtension || !validFormats.includes(fileExtension)) {
    alert('Invalid file format! Only jpg, jpeg, png, gif, and webp are allowed.');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPreview(uploadIcon);
    onFileSelect(null);
    return;
  }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onFileSelect(file);
  };

  const deleteImage = () => {
    setPreview(uploadIcon);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileSelect(null);

    if (onDelete) {
    onDelete();
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
