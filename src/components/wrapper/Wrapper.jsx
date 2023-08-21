import React from "react";
import PropTypes from 'prop-types';
import Preloader from "../../components/preloader/Preloader";
import styles from "./Wrapper.module.css";

function Wrapper({
  title,
  children,
  isLoading,
  errorMsg,
}) {
  return (
    <main className={styles.section}>
      <section className={`${styles.content} pl-5 pr-5`}>
        <h1 className="text text_type_main-large mb-5">{title}</h1>
        {errorMsg && <p className="text text_type_main-default">{errorMsg}</p>}
        {isLoading ? <Preloader /> : children}
      </section>
    </main>
  );
}

Wrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export default Wrapper;
