import React from "react";
import PropTypes from 'prop-types';

import styles from "./ModalOverlay.module.css";

function ModalOverlay({
  isOpen,
  children,
  closeModal
}) {
  function handleModal(e) {
    if(e.target === e.currentTarget) closeModal();
  }

  return (
    <div className={`${styles.overlay} ${isOpen && styles.overlay_visible}`} onClick={handleModal}>{children}</div>
  );
}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;
