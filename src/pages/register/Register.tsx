import React, { FC, useEffect, useCallback, ChangeEvent } from 'react';
import { NavLink } from 'react-router-dom';

import useModal from '../../hooks/useModal';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';

import Form from '../../components/form/Form';
import FormButton from '../../components/form-button/FormButton';
import FormFooter from '../../components/form-footer/FormFooter';
import Wrapper from '../../components/wrapper/Wrapper';
import Modal from '../../components/modal/Modal';
import ModalContent from '../../components/modal-content/ModalContent';

import { handleUser } from '../../services/actions/user';

import {
  REGISTER_TITLE,
  NAME_PLS,
  EMAIL_PLS,
  PASSWORD_PLS,
  LOGIN_URL,
  REGISTER_URL
} from '../../utils/constants';

import { useSelector, useDispatch } from '../../services/hooks';
import type { TRootState } from '../../services/store';
import type { TFieldsData } from '../../types';

const Register: FC = () => {
  const dispatch = useDispatch();
  const { isRegistered } = useSelector((state: TRootState) => state.user);
  const {
    isModalVisible,
    setModalVisibility
  } = useModal();
  const {
    values,
    validValues,
    errorMessages,
    handleChange,
    reset
  } = useInput();

  const fieldsData: TFieldsData[] = [
    {
      type: 'text',
      name: 'name',
      value: values.name || '',
      placeholder: NAME_PLS,
      error: validValues.name === undefined ? false : validValues.name,
      errorText: errorMessages.name || '',
      //@ts-ignore
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e)
    },
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

  const signUp = () => {
    if(isRegistered) {
      reset();
      disableBtn();
      setModalVisibility(true);
    }
  };

  const handleSubmit = useCallback(() => {
    dispatch(handleUser({ values }, REGISTER_URL));
  }, [
    values,
    dispatch
  ]);

  useEffect(() => {
    signUp();
  }, [
    isRegistered
  ]);

  return (
    <Wrapper isFormHolder={true}>
      <Form
        title={REGISTER_TITLE}
        fieldsData={fieldsData}
        onSubmit={handleSubmit}>
        <FormButton
          isBtnDisabled={isBtnDisabled}
          btnCaption="Зарегистрироваться" />
        <FormFooter>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы? <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink>
          </p>
        </FormFooter>
      </Form>
      {isModalVisible && (
        <Modal isModalOpen={isModalVisible} closeModal={() => setModalVisibility(false)}>
          <ModalContent>Вы успешно зарегистрировались! <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink></ModalContent>
        </Modal>
      )}
    </Wrapper>
  )
};

export default Register;
