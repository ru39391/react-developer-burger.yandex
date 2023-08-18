import React from "react";

import "./ModalOverlay.css";

function ModalOverlay({
  isOpen,
  children,
  closeModal
}) {
  function handleModal(e) {
    if(e.target === e.currentTarget) closeModal();
  }

  return (
    <div className={`modal-overlay ${isOpen && 'modal-overlay__visible'}`} onClick={handleModal}>{children}</div>
  );
}

export default ModalOverlay;
