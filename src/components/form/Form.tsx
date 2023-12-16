import React, { FC, ReactNode, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import {
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Form.module.css';

import type { TRootState } from '../../services/store';
import type { TFieldsData } from '../../types';

interface IForm {
  title?: string;
  fieldsData: TFieldsData[];
  onSubmit: Function;
  children: ReactNode;
  classNameMod?: string;
};

const Form: FC<IForm> = ({
  title,
  fieldsData,
  onSubmit,
  children,
  classNameMod
}) => {
  const { isFailed, errorMsg } = useSelector((state: TRootState) => state.user);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <form className={`${styles.wrapper} ${classNameMod && styles[classNameMod]}`} onSubmit={handleSubmit}>
        {title && <div className={`${styles.title} text text_type_main-medium mb-6`}>{title}</div>}
        {isFailed && <div className={`${styles.title} text text_type_main-default mb-4`} style={{ color: '#e52b1a' }}>{errorMsg}</div>}
        <fieldset className={`${styles.fieldset} mb-4`}>
          {fieldsData.map((item, index) => (
            item.name === 'password'
            ? <PasswordInput
              key={index}
              {...item}
            />
            : <Input
              key={index}
              {...item}
            />
          ))}
        </fieldset>
        {children}
      </form>
    </>
  )
};

export default Form;
