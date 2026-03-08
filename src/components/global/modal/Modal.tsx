import { type ReactNode, useEffect } from "react";

import useLockScroll from "../../../hooks/useLockScroll";

import styles from "./Modal.module.scss";

import ClearFieldIcon from "../../icons/ClearFieldIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const { lockScroll, unlockScroll } = useLockScroll();

  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [isOpen, lockScroll, unlockScroll]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}

          <button className={styles.closeButton} onClick={onClose}>
            <ClearFieldIcon />
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
