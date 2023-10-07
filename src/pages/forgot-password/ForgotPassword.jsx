import React from 'react';
import { NavLink } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';
import Form from '../../components/form/Form';
import Wrapper from '../../components/wrapper/Wrapper';

import {
  FORGOT_PASSWORD_TITLE,
  EMAIL_PLS,
  LOGIN_URL
} from '../../utils/constants';

function ForgotPassword() {
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
    }
  ];

  const { isBtnDisabled } = useSubmitBtn(fieldsData, validValues);

  return (
    <Wrapper title="" isFormHolder={true}>
      <Form title={FORGOT_PASSWORD_TITLE} fieldsData={fieldsData} btnCaption="Восстановить" isBtnDisabled={isBtnDisabled}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink>
        </p>
      </Form>
    </Wrapper>
  )
};

export default ForgotPassword;
