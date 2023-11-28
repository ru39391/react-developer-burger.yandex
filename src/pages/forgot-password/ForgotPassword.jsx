import { useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  EMAIL_PLS,
  LOGIN_URL,
  RESET_PASSWORD_URL
} from '../../utils/constants';

function ForgotPassword() {
  const navigate = useNavigate();
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
      type: 'email',
      name: 'email',
      value: values.email || '',
      placeholder: EMAIL_PLS,
      error: validValues.email === undefined ? false : validValues.email,
      errorText: errorMessages.email || '',
      onChange: (e) => handleChange(e)
    }
  ];

  const {
    isBtnDisabled,
    disableBtn
  } = useSubmitBtn(fieldsData, validValues);

  const handleSubmit = useCallback(() => {
    dispatch(recoverPassword({ ...values }));
  }, [
    values,
    dispatch
  ]);

  const submitRecoveryForm = ({ isRecoverySucceed }) => {
    if(isRecoverySucceed) {
      reset();
      disableBtn();
      navigate(`/${RESET_PASSWORD_URL}`);
    }
  };

  return (
    <Wrapper title="" isFormHolder={true}>
      <Form
        title={FORGOT_PASSWORD_TITLE}
        fieldsData={fieldsData}
        onSubmit={submitRecoveryForm}>
        <FormButton
          isBtnDisabled={isBtnDisabled}
          handleSubmit={handleSubmit}
          btnCaption="Восстановить" />
        <FormFooter>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль? <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink>
          </p>
        </FormFooter>
      </Form>
    </Wrapper>
  )
};

export default ForgotPassword;
