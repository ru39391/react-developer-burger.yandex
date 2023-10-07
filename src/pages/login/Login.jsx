import React from 'react';
import { NavLink } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';
import Form from '../../components/form/Form';
import Wrapper from '../../components/wrapper/Wrapper';

import {
  LOGIN_TITLE,
  EMAIL_PLS,
  PASSWORD_PLS,
  REGISTER_URL,
  FORGOT_PASSWORD_URL
} from '../../utils/constants';

function Login() {
  const {
    values: formValues,
    validValues,
    errorMessages,
    handleChange
  } = useInput();

  const fieldsData = [
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
    <Wrapper title="" isFormHolder={true}>
      <Form title={LOGIN_TITLE} fieldsData={fieldsData} btnCaption="Войти" isBtnDisabled={isBtnDisabled}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь? <NavLink to={`/${REGISTER_URL}`} style={{ textDecoration: 'none' }}>Зарегистрироваться</NavLink>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <NavLink to={`/${FORGOT_PASSWORD_URL}`} style={{ textDecoration: 'none' }}>Восстановить пароль</NavLink>
        </p>
      </Form>
    </Wrapper>
  )
};

export default Login;
