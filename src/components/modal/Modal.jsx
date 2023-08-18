import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import "./Modal.css";

import ModalOverlay from "../modal-overlay/ModalOverlay";

function Modal({ children }) {
  return (
    <ModalOverlay>
      <div className="modal">
        <button className="modal__close" type="button"><CloseIcon type="primary" /></button>
        {children}
      </div>
    </ModalOverlay>
  );
}

export default Modal;
