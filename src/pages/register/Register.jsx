import React from 'react';
import { NavLink } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';
import Form from '../../components/form/Form';

import {
  REGISTER_TITLE,
  NAME_PLS,
  EMAIL_PLS,
  PASSWORD_PLS,
  LOGIN_URL
} from '../../utils/constants';

function Register() {
  const {
    values: formValues,
    validValues,
    errorMessages,
    handleChange
  } = useInput();

  const fieldsData = [
    {
      type: 'text',
      name: 'name',
      value: formValues.name || '',
      placeholder: NAME_PLS,
      error: validValues.name === undefined ? false : validValues.name,
      errorText: errorMessages.name || '',
      onChange: (e) => handleChange(e)
    },
    {
      type: 'email',
      name: 'email',
      value: formValues.email || '',
      placeholder: EMAIL_PLS,
      error: validValues.email === undefined ? false : validValues.email,
      errorText: errorMessages.email || '',
      onChange: (e) => handleChange(e)
    },
    {
      name: 'password',
      value: formValues.password || '',
      placeholder: PASSWORD_PLS,
      error: validValues.password === undefined ? false : validValues.password,
      errorText: errorMessages.password || '',
      onChange: (e) => handleChange(e),
    }
  ];

  const { isBtnDisabled } = useSubmitBtn(fieldsData, validValues);

  return (
    <Form title={REGISTER_TITLE} fieldsData={fieldsData} btnCaption="Зарегистрироваться" isBtnDisabled={isBtnDisabled}>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink>
      </p>
    </Form>
  )
};

export default Register;
