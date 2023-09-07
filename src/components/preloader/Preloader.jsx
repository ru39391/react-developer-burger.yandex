import React from 'react'
import styles from './Preloader.module.css'

function Preloader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.round}></span>
      </div>
    </div>
  )
};

export default Preloader
