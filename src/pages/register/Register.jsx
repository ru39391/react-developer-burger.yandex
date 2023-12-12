import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
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

import { fetchData } from '../../services/actions/user';

import {
  REGISTER_TITLE,
  NAME_PLS,
  EMAIL_PLS,
  PASSWORD_PLS,
  LOGIN_URL,
  REGISTER_URL
} from '../../utils/constants';

function Register() {
  const dispatch = useDispatch();
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

  const fieldsData = [
    {
      type: 'text',
      name: 'name',
      value: values.name || '',
      placeholder: NAME_PLS,
      error: validValues.name === undefined ? false : validValues.name,
      errorText: errorMessages.name || '',
      onChange: (e) => handleChange(e)
    },
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
    dispatch(fetchData({ values }, REGISTER_URL));
  }, [
    values,
    dispatch
  ]);

  const signUp = (data) => {
    if(data.isSucceed) {
      reset();
      disableBtn();
      setModalVisibility(true);
    }
  };

  return (
    <Wrapper title="" isFormHolder={true}>
      <Form
        title={REGISTER_TITLE}
        fieldsData={fieldsData}
        onSubmit={signUp}>
        <FormButton
          isBtnDisabled={isBtnDisabled}
          handleSubmit={handleSubmit}
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
