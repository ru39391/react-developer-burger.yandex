import React, { FC } from 'react';
import PropTypes from 'prop-types';
import styles from './FormFooter.module.css';

function FormFooter({ children }) {
  return (
    <div className={styles.wrapper}>{children}</div>
  )
};

FormFooter.propTypes = {
  children: PropTypes.node
};

export default FormFooter;
