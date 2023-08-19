import { useEffect } from "react";
import { createPortal } from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import "./Modal.css";

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
      <div className="modal">
        <button className="modal__close" type="button" onClick={closeModal}><CloseIcon type="primary" /></button>
        {children}
      </div>
    </ModalOverlay>,
    document.body
  )
}

export default Modal;
