import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import Preloader from '../preloader/Preloader';
import styles from './Wrapper.module.css';

import type { TRootState } from '../../services/store';

interface IWrapperProps {
  title?: string;
  children?: ReactNode;
  isFormHolder?: boolean;
  isGrid?: boolean;
};

const Wrapper: FC<IWrapperProps> = ({
  title,
  children,
  isFormHolder,
  isGrid
}) => {
  const {
    itemsRequest: isLoading,
    errorMsg
  } = useSelector((state: TRootState) => state.products);

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

export default Wrapper;
