import React, { FC, useCallback, useEffect, ChangeEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth'
import useModal from '../../hooks/useModal';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';

import Form from '../../components/form/Form';
import FormButton from '../../components/form-button/FormButton';
import FormFooter from '../../components/form-footer/FormFooter';
import Wrapper from '../../components/wrapper/Wrapper';
import Modal from '../../components/modal/Modal';
import ModalContent from '../../components/modal-content/ModalContent';

import { recoverPassword } from '../../services/actions/user';

import {
  FORGOT_PASSWORD_TITLE,
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  RESET_URL
} from '../../utils/constants';

import { useSelector, useDispatch } from '../../services/hooks';
import type { TFieldsData } from '../../types';

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isResetSucceed } = useSelector(state => state.user);
  const { isModalVisible, setModalVisibility } = useModal();
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
      name: 'password',
      value: values.password || '',
      placeholder: 'Введите новый пароль',
      error: validValues.password === undefined ? false : validValues.password,
      errorText: errorMessages.password || '',
      //@ts-ignore
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e),
    },
    {
      type: 'text',
      name: 'token',
      value: values.token || '',
      placeholder: 'Введите код из письма',
      error: validValues.token === undefined ? false : validValues.token,
      errorText: errorMessages.token || '',
      //@ts-ignore
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e)
    }
  ];

  const {
    isBtnDisabled,
    disableBtn
  } = useSubmitBtn(fieldsData, validValues);

  const submitResetForm = () => {
    if(isResetSucceed) {
      reset();
      disableBtn();
      setModalVisibility(true);
    }
  };

  const handleSubmit = useCallback(() => {
    dispatch(recoverPassword({ ...values }, RESET_URL));
  }, [
    values,
    dispatch
  ]);

  useEffect(() => {
    if(!isPasswordReqSent) {
      navigate(`/${FORGOT_PASSWORD_URL}`, { replace: false });
    }
  }, []);

  useEffect(() => {
    submitResetForm();
  }, [
    isResetSucceed
  ]);

  return (
    <Wrapper isFormHolder={true}>
      <Form
        title={FORGOT_PASSWORD_TITLE}
        fieldsData={fieldsData}
        onSubmit={handleSubmit}>
        <FormButton
          isBtnDisabled={isBtnDisabled}
          btnCaption="Сохранить" />
        <FormFooter>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль? <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink>
          </p>
        </FormFooter>
      </Form>
      {isModalVisible && (
        <Modal isModalOpen={isModalVisible} closeModal={() => setModalVisibility(false)}>
          <ModalContent>Пароль успешно изменён! <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink></ModalContent>
        </Modal>
      )}
    </Wrapper>
  )
};

export default ResetPassword;
