import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import "./Modal.css";

import ModalOverlay from "../modal-overlay/ModalOverlay";

function Modal({
  isModalOpen,
  children,
  closeModal
}) {
  return (
    <ModalOverlay isOpen={isModalOpen} closeModal={closeModal}>
      <div className="modal">
        <button className="modal__close" type="button" onClick={closeModal}><CloseIcon type="primary" /></button>
        {children}
      </div>
    </ModalOverlay>
  );
}

export default Modal;
