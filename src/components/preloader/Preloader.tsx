import React, { FC } from 'react'
import styles from './Preloader.module.css'

const Preloader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.round}></span>
      </div>
    </div>
  )
};

export default Preloader;
