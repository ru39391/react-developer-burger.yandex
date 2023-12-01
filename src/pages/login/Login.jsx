import { useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';

import Form from '../../components/form/Form';
import FormButton from '../../components/form-button/FormButton';
import FormFooter from '../../components/form-footer/FormFooter';
import Wrapper from '../../components/wrapper/Wrapper';

import { fetchData } from '../../services/actions/user';

import storage from '../../utils/storage';
import {
  LOGIN_TITLE,
  EMAIL_PLS,
  PASSWORD_PLS,
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  IS_LOGGED_KEY
} from '../../utils/constants';

function Login() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    values,
    validValues,
    errorMessages,
    handleChange,
    reset
  } = useInput();
  const targetUrl = state && state.prevUrl;

  const fieldsData = [
    {
      type: 'email',
      name: 'email',
      value: values.email || '',
      placeholder: EMAIL_PLS,
      error: validValues.email === undefined ? false : validValues.email,
      errorText: errorMessages.email || '',
      onChange: (e) => handleChange(e)
    },
    {
      name: 'password',
      value: values.password || '',
      placeholder: PASSWORD_PLS,
      error: validValues.password === undefined ? false : validValues.password,
      errorText: errorMessages.password || '',
      onChange: (e) => handleChange(e),
    }
  ];

  const {
    isBtnDisabled,
    disableBtn
  } = useSubmitBtn(fieldsData, validValues);

  const handleSubmit = useCallback(() => {
    dispatch(fetchData({ values }, LOGIN_URL));
  }, [
    values,
    dispatch
  ]);

  const signIn = ({ isLogged }) => {
    if(isLogged) {
      reset();
      disableBtn();
      storage.setStorageItem(IS_LOGGED_KEY, isLogged);
      navigate(`${targetUrl ? state.prevUrl : '/'}`, { replace: false });
    }
  };

  return (
    <Wrapper title="" isFormHolder={true}>
      <Form
        title={LOGIN_TITLE}
        fieldsData={fieldsData}
        onSubmit={signIn}>
        <FormButton
          isBtnDisabled={isBtnDisabled}
          handleSubmit={handleSubmit}
          btnCaption="Войти" />
        <FormFooter>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь? <NavLink to={`/${REGISTER_URL}`} style={{ textDecoration: 'none' }}>Зарегистрироваться</NavLink>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль? <NavLink to={`/${FORGOT_PASSWORD_URL}`} style={{ textDecoration: 'none' }}>Восстановить пароль</NavLink>
          </p>
        </FormFooter>
      </Form>
    </Wrapper>
  )
};

export default Login;
