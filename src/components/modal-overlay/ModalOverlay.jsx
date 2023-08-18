import React from "react";

import "./ModalOverlay.css";

function ModalOverlay({ children }) {
  return (
    <div className="modal-overlay">{children}</div>
  );
}

export default ModalOverlay;
