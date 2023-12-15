import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './FormButton.module.css';

import type { TRootState } from '../../services/store';

interface IFormButton {
  isBtnGroup: boolean;
  isBtnDisabled: boolean;
  handleSubmit: () => void;
  handleSubmitOptional: () => void;
  btnCaption: string;
  btnCaptionOptional: string;
};

const FormButton: FC<IFormButton> = ({
  isBtnGroup,
  isBtnDisabled,
  handleSubmit,
  handleSubmitOptional,
  btnCaption,
  btnCaptionOptional
}) => {
  const { userRequest } = useSelector((state: TRootState) => state.user);

  return (
    <div className={isBtnGroup ? styles.wrapper : 'mb-20'}>
      <Button htmlType="submit" type="primary" size="medium" disabled={isBtnDisabled || userRequest} onClick={handleSubmit}>{btnCaption}</Button>
      {isBtnGroup && <Button htmlType="button" type="primary" size="medium" disabled={isBtnDisabled || userRequest} onClick={handleSubmitOptional}>{btnCaptionOptional}</Button>}
    </div>
  )
};

export default FormButton;
