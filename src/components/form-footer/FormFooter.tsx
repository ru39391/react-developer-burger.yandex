import React, { FC, ReactNode } from 'react';
import styles from './FormFooter.module.css';

interface IFormFooter {
  children: ReactNode;
};

const FormFooter: FC<IFormFooter> = ({ children }) => {
  return (
    <div className={styles.wrapper}>{children}</div>
  )
};

export default FormFooter;
