import React from "react";
import PropTypes from 'prop-types';

function ModalContent({ children }) {
  return (
    <div className="pt-20 pb-20" style={{ textAlign: 'center' }}><p className="text text_type_main-medium">{children}</p></div>
  );
}

ModalContent.propTypes = {
  children: PropTypes.node.isRequired
};

export default ModalContent;
