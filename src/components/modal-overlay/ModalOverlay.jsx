import React from "react";
import PropTypes from 'prop-types';

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

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;
