import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import Form from '../../components/form/Form';

import {
  REGISTER_URL,
  FORGOT_PASSWORD_URL
} from '../../utils/constants';

function Login() {
  const {
    values: formValues,
    handleChange
  } = useInput({});

  const inputs = [
    {
      type: 'email',
      name: 'email',
      value: formValues.email || '',
      placeholder: 'E-mail',
      onChange: (e) => handleChange(e)
    },
    {
      type: 'password',
      name: 'password',
      value: formValues.password || '',
      placeholder: 'Пароль',
      onChange: (e) => handleChange(e),
      onIconClick: (e) => {
        console.log(e.currentTarget)
      },
    }
  ];

  return (
    <Form title="Вход" inputs={inputs} btnCaption="Войти">
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
