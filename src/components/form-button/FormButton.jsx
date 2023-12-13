import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './FormButton.module.css';

function FormButton({
  isBtnGroup,
  isBtnDisabled,
  handleSubmit,
  handleSubmitOptional,
  btnCaption,
  btnCaptionOptional
}) {
  const { userRequest } = useSelector(state => state.user);

  return (
    <div className={isBtnGroup ? styles.wrapper : 'mb-20'}>
      <Button htmlType="submit" type="primary" size="medium" disabled={isBtnDisabled || userRequest} onClick={handleSubmit}>{btnCaption}</Button>
      {isBtnGroup && <Button htmlType="button" type="primary" size="medium" disabled={isBtnDisabled || userRequest} onClick={handleSubmitOptional}>{btnCaptionOptional}</Button>}
    </div>
  )
};

FormButton.propTypes = {
  isBtnGroup: PropTypes.bool,
  isBtnDisabled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitOptional: PropTypes.func,
  btnCaption: PropTypes.string.isRequired,
  btnCaptionOptional: PropTypes.string
};

export default FormButton;
