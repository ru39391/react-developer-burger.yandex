import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';

import Form from '../../components/form/Form';
import FormButton from '../../components/form-button/FormButton';
import FormFooter from '../../components/form-footer/FormFooter';
import Wrapper from '../../components/wrapper/Wrapper';

import { recoverPassword } from '../../services/actions/user';

import {
  FORGOT_PASSWORD_TITLE,
  LOGIN_URL,
  RESET_URL
} from '../../utils/constants';

function ResetPassword() {
  const dispatch = useDispatch();
  const {
    values,
    validValues,
    errorMessages,
    handleChange,
    reset
  } = useInput();

  const fieldsData = [
    {
      name: 'password',
      value: values.password || '',
      placeholder: 'Введите новый пароль',
      error: validValues.password === undefined ? false : validValues.password,
      errorText: errorMessages.password || '',
      onChange: (e) => handleChange(e),
    },
    {
      type: 'text',
      name: 'token',
      value: values.token || '',
      placeholder: 'Введите код из письма',
      error: validValues.token === undefined ? false : validValues.token,
      errorText: errorMessages.token || '',
      onChange: (e) => handleChange(e)
    }
  ];

  const {
    isBtnDisabled,
    disableBtn
  } = useSubmitBtn(fieldsData, validValues);

  const handleSubmit = useCallback(() => {
    dispatch(recoverPassword({ ...values }, RESET_URL));
  }, [
    values,
    dispatch
  ]);

  const submitResetForm = () => {
    reset();
    disableBtn();
  };

  return (
    <Wrapper title="" isFormHolder={true}>
    <Form
      title={FORGOT_PASSWORD_TITLE}
      fieldsData={fieldsData}
      onSubmit={submitResetForm}>
      <FormButton
        isBtnDisabled={isBtnDisabled}
        handleSubmit={handleSubmit}
        btnCaption="Сохранить" />
      <FormFooter>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink>
        </p>
      </FormFooter>
    </Form>
    </Wrapper>
  )
};

export default ResetPassword;
