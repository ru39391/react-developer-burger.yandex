import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import Form from '../../components/form/Form';

import {
  REGISTER_URL,
  FORGOT_PASSWORD_URL
} from '../../utils/constants';

function Login() {
  const [isBtnDisabled, setBtnDisabled] = useState(true);

  const {
    values: formValues,
    validValues,
    errorMessages,
    handleChange
  } = useInput({});

  const inputs = [
    {
      type: 'email',
      name: 'email',
      value: formValues.email || '',
      placeholder: 'E-mail',
      error: validValues.email === undefined ? false : validValues.email,
      errorText: errorMessages.email,
      onChange: (e) => handleChange(e)
    },
    {
      name: 'password',
      value: formValues.password || '',
      placeholder: 'Пароль',
      error: validValues.password === undefined ? false : validValues.password,
      errorText: errorMessages.password,
      onChange: (e) => handleChange(e),
    }
  ];

  useEffect(() => {
    const validValuesArr = Object.values(validValues);
    setBtnDisabled(
      validValuesArr.length === inputs.length
      ? validValuesArr.some(item => item)
      : true
    );
  }, [validValues]);

  return (
    <Form title="Вход" inputs={inputs} btnCaption="Войти" isBtnDisabled={isBtnDisabled}>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <NavLink to={`/${REGISTER_URL}`} style={{ textDecoration: 'none' }}>Зарегистрироваться</NavLink>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <NavLink to={`/${FORGOT_PASSWORD_URL}`} style={{ textDecoration: 'none' }}>Восстановить пароль</NavLink>
      </p>
    </Form>
  )
};

export default Login;
