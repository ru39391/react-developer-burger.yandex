import { useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';

import Form from '../../components/form/Form';
import Wrapper from '../../components/wrapper/Wrapper';

import { fetchData } from '../../services/actions/user';

import {
  LOGIN_TITLE,
  EMAIL_PLS,
  PASSWORD_PLS,
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  PROFILE_URL,
} from '../../utils/constants';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, isSucceed } = useSelector(state => state.user);
  const {
    values: formValues,
    validValues,
    errorMessages,
    handleChange,
    reset
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

  const signIn = (data) => {
    if(data.isLogged) {
      reset();
      navigate(`/${PROFILE_URL}`);
    }
  };

  /*
  const handleSubmit = useCallback(() => {
    dispatch(fetchData({ values: formValues }, LOGIN_URL));
  }, [
    formValues,
    dispatch
  ]);

  useEffect(() => {
    signIn(isSucceed);
  }, [isSucceed]);
  */

  return (
    <Wrapper title="" isFormHolder={true}>
      <Form
        title={LOGIN_TITLE}
        action={LOGIN_URL}
        values={formValues}
        fieldsData={fieldsData}
        isBtnDisabled={isBtnDisabled}
        onSubmit={signIn}
        btnCaption="Войти">
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
