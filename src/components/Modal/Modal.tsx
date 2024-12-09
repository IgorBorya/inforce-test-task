import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean; // Controls whether the modal is visible
  onClose: () => void; // Function to close the modal
  children: React.ReactNode; // Content to display inside the modal
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null; // If modal is not open, render nothing

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
