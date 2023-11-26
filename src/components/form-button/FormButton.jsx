import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './FormButton.module.css';

function FormButton({
  isBtnDisabled,
  handleSubmit,
  btnCaption,
  classNameMod
}) {
  const { userRequest } = useSelector(state => state.user);

  return (
    <div className='mb-20'>
      <Button htmlType="submit" type="primary" size="medium" disabled={isBtnDisabled || userRequest} onClick={handleSubmit}>{btnCaption}</Button>
    </div>
  )
};

FormButton.propTypes = {
  isBtnDisabled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  btnCaption: PropTypes.string.isRequired,
  classNameMod: PropTypes.string
};

export default FormButton;
