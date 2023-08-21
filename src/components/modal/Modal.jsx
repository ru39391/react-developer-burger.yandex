import { useEffect } from "react";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Modal.module.css";

import ModalOverlay from "../modal-overlay/ModalOverlay";

function Modal({
  isModalOpen,
  children,
  closeModal
}) {
  useEffect(() => {
    function handleEscClose(e) {
      if(e.key === 'Escape') closeModal();
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
    document.body
  )
}

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
