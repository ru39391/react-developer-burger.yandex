import React, { FC } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './FormButton.module.css';

import { useSelector } from '../../services/hooks';
import type { TRootState } from '../../services/store';

interface IFormButton {
  isBtnGroup?: boolean;
  isBtnDisabled: boolean;
  handleBtn?: () => void;
  btnCaption: string;
  btnCaptionOptional?: string;
};

const FormButton: FC<IFormButton> = ({
  isBtnGroup,
  isBtnDisabled,
  handleBtn,
  btnCaption,
  btnCaptionOptional
}) => {
  const { userRequest } = useSelector((state: TRootState) => state.user);

  return (
    <div className={isBtnGroup ? styles.wrapper : 'mb-20'}>
      <Button htmlType="submit" type="primary" size="medium" disabled={isBtnDisabled || userRequest}>{btnCaption}</Button>
      {isBtnGroup && <Button htmlType="button" type="primary" size="medium" disabled={isBtnDisabled || userRequest} onClick={handleBtn}>{btnCaptionOptional}</Button>}
    </div>
  )
};

export default FormButton;
