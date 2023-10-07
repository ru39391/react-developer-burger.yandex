import React from "react";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from "../../components/preloader/Preloader";
import styles from "./Wrapper.module.css";

function Wrapper({
  title,
  children,
  isFormHolder,
  isGrid
}) {
  const {
    itemsRequest: isLoading,
    errorMsg
  } = useSelector(state => state.productData);

  return (
    <main className={`${styles.section} ${isFormHolder && `mt-30`} ${isGrid && `mt-20`}`}>
      <section className={`${styles.content} ${isFormHolder && styles.ai_center} ${isGrid && styles.type_grid} pl-5 pr-5`}>
        {title && <h1 className="text text_type_main-large mb-5">{title}</h1>}
        {errorMsg && <p className="text text_type_main-default">{errorMsg}</p>}
        {isLoading ? <Preloader /> : children}
      </section>
    </main>
  );
}

Wrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  isFormHolder: PropTypes.bool,
  isGrid: PropTypes.bool
};

export default Wrapper;
