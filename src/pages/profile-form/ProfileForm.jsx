import { useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
import useInput from '../../hooks/useInput';

import Form from '../../components/form/Form';
import FormButton from '../../components/form-button/FormButton';
import Modal from '../../components/modal/Modal';
import ModalContent from '../../components/modal-content/ModalContent';

import { getAccessToken, updateData } from '../../services/actions/user';

import {
  NAME_PLS,
  PASSWORD_PLS,
  USER_URL,
  TOKEN_URL,
  TOKEN_ERROR_MSG,
  PASSWORD_DEFAULT_VAL
} from '../../utils/constants';

function ProfileForm() {
  const dispatch = useDispatch();
  const { name, email } = useSelector(state => state.user);
  const { isModalVisible, setModalVisibility } = useModal();
  const {
    accessToken,
    refreshToken,
    isRefTokExist,
    isAccTokExist,
    isTokenExpired
  } = useAuth();
  const {
    values,
    validValues,
    editedValues,
    errorMessages,
    handleChange,
    setValues
  } = useInput();

  const fieldsData = [
    {
      icon: 'EditIcon',
      type: 'text',
      name: 'name',
      value: values.name || '',
      placeholder: NAME_PLS,
      error: validValues.name === undefined ? false : validValues.name,
      errorText: errorMessages.name || '',
      onChange: (e) => handleChange(e)
    },
    {
      icon: 'EditIcon',
      type: 'email',
      name: 'email',
      value: values.email || '',
      placeholder: 'Логин',
      error: validValues.email === undefined ? false : validValues.email,
      errorText: errorMessages.email || '',
      onChange: (e) => handleChange(e),
    },
    {
      icon: 'EditIcon',
      name: 'password',
      value: values.password || '',
      placeholder: PASSWORD_PLS,
      error: validValues.password === undefined ? false : validValues.password,
      errorText: errorMessages.password || '',
      onChange: (e) => handleChange(e)
    }
  ];

  const getCurrentToken = useCallback(() => {
    //console.log('refreshed', isRefTokExist);

    if(isRefTokExist) {
      const { token } = refreshToken;
      dispatch(getAccessToken({ token }, TOKEN_URL));
    } else {
      setModalVisibility(true);
    }
  }, [
    dispatch
  ]);

  const getUserData = useCallback(() => {
    if(isAccTokExist) {
      const { token: jwt } = accessToken;
      isTokenExpired
        ? getCurrentToken()
        : dispatch(getAccessToken({ jwt }, USER_URL));
    } else {
      setModalVisibility(true);
    }
  }, [
    isAccTokExist,
    dispatch
  ]);

  const updatedValues = useMemo(() =>
    Object.values(editedValues).reduce((acc, item, index) =>
      ![name, email].includes(item)
      ? ({
          ...acc,
          [Object.keys(editedValues)[index]]: item
        })
      : ({...acc})
    ,
  {}), [
    editedValues
  ]);

  const handleSubmit = useCallback(() => {
    console.log(isTokenExpired);
    if(isTokenExpired) {
      getCurrentToken();
    }

    dispatch(updateData({ values: updatedValues }, USER_URL));
  }, [
    updatedValues,
    dispatch
  ]);

  const setDefaultValues = () => {
    setValues({
      name,
      email,
      password: PASSWORD_DEFAULT_VAL
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setDefaultValues();
  }, [
    name,
    email
  ]);

  return (
    <>
      <Form
        title=""
        fieldsData={fieldsData}
        onSubmit={setDefaultValues}
        classNameMod="ai_start">
        <FormButton
          isBtnGroup={true}
          isBtnDisabled={!Object.values(updatedValues).length}
          handleSubmit={handleSubmit}
          handleSubmitOptional={setDefaultValues}
          btnCaption="Сохранить"
          btnCaptionOptional="Отмена"
          />
      </Form>
      {isModalVisible && (
        <Modal isModalOpen={isModalVisible} closeModal={() => setModalVisibility(false)}>
          <ModalContent children={TOKEN_ERROR_MSG} />
        </Modal>
      )}
    </>
  )
};

export default ProfileForm;
