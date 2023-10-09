import React from 'react';
import { NavLink } from 'react-router-dom';

import useModal from '../../hooks/useModal';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';

import Form from '../../components/form/Form';
import Wrapper from '../../components/wrapper/Wrapper';
import Modal from '../../components/modal/Modal';

import {
  REGISTER_TITLE,
  NAME_PLS,
  EMAIL_PLS,
  PASSWORD_PLS,
  LOGIN_URL,
  REGISTER_URL
} from '../../utils/constants';

function Register() {
  const {
    isModalVisible,
    setModalVisibility
  } = useModal();
  const {
    values: formValues,
    validValues,
    errorMessages,
    handleChange,
    reset
  } = useInput();

  const fieldsData = [
    {
      type: 'text',
      name: 'name',
      value: formValues.name || '',
      placeholder: NAME_PLS,
      error: validValues.name === undefined ? false : validValues.name,
      errorText: errorMessages.name || '',
      onChange: (e) => handleChange(e)
    },
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

  const signUp = (data) => {
    if(data.isSucceed) {
      reset();
      setModalVisibility(true);
    }
  };

  return (
    <Wrapper title="" isFormHolder={true}>
      <Form
        title={REGISTER_TITLE}
        action={REGISTER_URL}
        values={formValues}
        fieldsData={fieldsData}
        isBtnDisabled={isBtnDisabled}
        onSubmit={signUp}
        btnCaption="Зарегистрироваться">
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink>
        </p>
      </Form>
      {isModalVisible && (
        <Modal isModalOpen={isModalVisible} closeModal={() => setModalVisibility(false)}>
          <div className="pt-20 pb-20" style={{ textAlign: 'center' }}>
            <p className="text text_type_main-medium">
              Вы успешно зарегистрировались! <NavLink to={`/${LOGIN_URL}`} style={{ textDecoration: 'none' }}>Войти</NavLink>
            </p>
          </div>
        </Modal>
      )}
    </Wrapper>
  )
};

export default Register;
