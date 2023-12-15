import React, { FC, useCallback, ChangeEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useAuth from '../../hooks/useAuth';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';

import Form from '../../components/form/Form';
import FormButton from '../../components/form-button/FormButton';
import FormFooter from '../../components/form-footer/FormFooter';
import Wrapper from '../../components/wrapper/Wrapper';

import { recoverPassword } from '../../services/actions/user';

import storage from '../../utils/storage';
import {
  FORGOT_PASSWORD_TITLE,
  EMAIL_PLS,
  LOGIN_URL,
  RESET_PASSWORD_URL,
  IS_PASSWORD_REQ_SENT_KEY
} from '../../utils/constants';

import type { TFieldsData } from '../../types';

const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    values,
    validValues,
    errorMessages,
    handleChange,
    reset
  } = useInput();
  const { isPasswordReqSent } = useAuth();

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
    }
  ];

  const {
    isBtnDisabled,
    disableBtn
  } = useSubmitBtn(fieldsData, validValues);

  const handleSubmit = useCallback(() => {
    //@ts-ignore
    dispatch(recoverPassword({ ...values }));
  }, [
    values,
    dispatch
  ]);

  const submitRecoveryForm = ({ isRecoverySucceed }: { isRecoverySucceed: boolean }) => {
    if(isRecoverySucceed && !isPasswordReqSent) {
      reset();
      disableBtn();
      storage.setStorageItem(IS_PASSWORD_REQ_SENT_KEY, isRecoverySucceed);
      navigate(`/${RESET_PASSWORD_URL}`, { replace: true });
    }
  };

  return (
    <Wrapper isFormHolder={true}>
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
