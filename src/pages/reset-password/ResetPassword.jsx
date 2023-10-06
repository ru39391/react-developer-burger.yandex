import React from 'react';
import { NavLink } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';
import Form from '../../components/form/Form';

import {
  FORGOT_PASSWORD_TITLE,
  LOGIN_URL
} from '../../utils/constants';

function ResetPassword() {
  const {
    values: formValues,
    validValues,
    errorMessages,
    handleChange
  } = useInput();

  const fieldsData = [
    {
      name: 'password',
      value: formValues.password || '',
      placeholder: 'Введите новый пароль',
      error: validValues.password === undefined ? false : validValues.password,
      errorText: errorMessages.password || '',
      onChange: (e) => handleChange(e),
    },
    {
      type: 'text',
      name: 'code',
      value: formValues.code || '',
      placeholder: 'Введите код из письма',
      error: validValues.code === undefined ? false : validValues.code,
      errorText: errorMessages.code || '',
      onChange: (e) => handleChange(e)
    }
  ];

  const { isBtnDisabled } = useSubmitBtn(fieldsData, validValues);

  return (
    <Form title={FORGOT_PASSWORD_TITLE} fieldsData={fieldsData} btnCaption="Сохранить" isBtnDisabled={isBtnDisabled}>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink>
      </p>
    </Form>
  )
};

export default ResetPassword;
