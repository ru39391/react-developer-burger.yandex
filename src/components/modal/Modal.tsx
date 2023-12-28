import React, {
  FC,
  useEffect,
  ReactNode,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler
} from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Modal.module.css";

import ModalOverlay from "../modal-overlay/ModalOverlay";

const modalElement = document.querySelector('#modals') as HTMLElement;

interface IModalProps {
  isModalOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
};

const Modal: FC<IModalProps> = ({
  isModalOpen,
  children,
  closeModal
}) => {
  useEffect(() => {
    function handleEscClose(e: unknown) {
      if ((e as KeyboardEvent).key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [closeModal]);

  return createPortal(
    <ModalOverlay isOpen={isModalOpen} closeModal={closeModal}>
      <div className={`${styles.wrapper} pt-10 pr-10 pb-10 pl-10`}>
        <button className={styles.close} type="button" onClick={closeModal}><CloseIcon type="primary" /></button>
        {children}
      </div>
    </ModalOverlay>,
    modalElement
  )
}

export default Modal;
