import React, { FC, useEffect, useCallback, ChangeEvent } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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

import type { TRootState } from '../../services/store';
import type { TFieldsData, TLocState } from '../../types';

const Login: FC = () => {
  const { state }: { state: TLocState | (null | undefined) } = useLocation();
  const prevUrl = typeof state === 'object' && state !== null ? state.prevUrl : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state: TRootState) => state.user);
  const {
    values,
    validValues,
    errorMessages,
    handleChange,
    reset
  } = useInput();
  const targetUrl: boolean = Boolean(state && prevUrl);

  const fieldsData: TFieldsData[] = [
    {
      type: 'email',
      name: 'email',
      value: values.email || '',
      placeholder: EMAIL_PLS,
      error: validValues.email === undefined ? false : validValues.email,
      errorText: errorMessages.email || '',
      //@ts-ignore
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e)
    },
    {
      name: 'password',
      value: values.password || '',
      placeholder: PASSWORD_PLS,
      error: validValues.password === undefined ? false : validValues.password,
      errorText: errorMessages.password || '',
      //@ts-ignore
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e),
    }
  ];

  const {
    isBtnDisabled,
    disableBtn
  } = useSubmitBtn(fieldsData, validValues);

  const signIn = () => {
    if(isLogged) {
      reset();
      disableBtn();
      storage.setStorageItem(IS_LOGGED_KEY, isLogged);
      navigate(`${targetUrl ? prevUrl : '/'}`, { replace: false });
    }
  };

  const handleSubmit = useCallback(() => {
    //@ts-ignore
    dispatch(fetchData({ values }, LOGIN_URL));
  }, [
    values,
    dispatch
  ]);

  useEffect(() => {
    signIn();
  }, [
    isLogged
  ]);

  return (
    <Wrapper isFormHolder={true}>
      <Form
        title={LOGIN_TITLE}
        fieldsData={fieldsData}
        onSubmit={handleSubmit}>
        <FormButton
          isBtnDisabled={isBtnDisabled}
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
