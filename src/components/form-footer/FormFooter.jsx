import React, { FC } from 'react';
import styles from './FormFooter.module.css';

function FormFooter({ children }) {
  return (
    <div className={styles.wrapper}>{children}</div>
  )
};

export default FormFooter;
