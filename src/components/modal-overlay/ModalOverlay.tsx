import React, {
  FC,
  ReactNode,
  SyntheticEvent,
  MouseEventHandler
} from 'react';

import styles from "./ModalOverlay.module.css";

interface IModalOverlayProps {
  isOpen: boolean;
  children: ReactNode;
  closeModal: Function;
};

const ModalOverlay: FC<IModalOverlayProps> = ({
  isOpen,
  children,
  closeModal
}) => {
  const handleModal: MouseEventHandler<HTMLDivElement> = (e: SyntheticEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div className={`${styles.overlay} ${isOpen && styles.overlay_visible}`} onClick={handleModal}>{children}</div>
  );
}

export default ModalOverlay;
