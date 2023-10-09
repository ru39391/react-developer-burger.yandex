import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';

import Form from '../../components/form/Form';
import Modal from '../../components/modal/Modal';
import ModalContent from '../../components/modal-content/ModalContent';

import { getAccessToken } from '../../services/actions/user';

import {
  NAME_PLS,
  PASSWORD_PLS,
  USER_URL,
  TOKEN_URL,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_ERROR_MSG
} from '../../utils/constants';

function ProfileForm() {
  const dispatch = useDispatch();
  const {
    name,
    email
  } = useSelector(state => state.user);
  const {
    isModalVisible,
    setModalVisibility
  } = useModal();
  const {
    getToken,
    isTokenExist,
    isTokenExpired,
    setCurrTokens
  } = useAuth();
  const {
    values: formValues,
    validValues,
    errorMessages,
    handleChange
  } = useInput();

  const fieldsData = [
    {
      icon: 'EditIcon',
      type: 'text',
      name: 'name',
      disabled: true,
      value: formValues.name || name,
      placeholder: NAME_PLS,
      error: validValues.name === undefined ? false : validValues.name,
      errorText: errorMessages.name || '',
      onChange: (e) => handleChange(e),
      onIconClick: (e) => {
        console.log(e.target);
      }
    },
    {
      icon: 'EditIcon',
      type: 'email',
      name: 'email',
      disabled: true,
      value: formValues.email || email,
      placeholder: 'Логин',
      error: validValues.email === undefined ? false : validValues.email,
      errorText: errorMessages.email || '',
      onChange: (e) => handleChange(e),
      onIconClick: (e) => {
        console.log(e.target);
      }
    },
    {
      icon: 'EditIcon',
      name: 'password',
      disabled: true,
      value: formValues.password || '******',
      placeholder: PASSWORD_PLS,
      error: validValues.password === undefined ? false : validValues.password,
      errorText: errorMessages.password || '',
      onChange: (e) => handleChange(e),
      onIconClick: (e) => {
        console.log(e.target);
      }
    }
  ];

  const { isBtnDisabled } = useSubmitBtn(fieldsData, validValues);

  const editUserData = (isSucceed) => {
    if(isSucceed) {
      //console.log('isSucceed', isSucceed);
    }
  };

  const getCurrentToken = useCallback(() => {
    console.log('refreshed', isTokenExist(REFRESH_TOKEN_KEY));

    if(isTokenExist(REFRESH_TOKEN_KEY)) {
      const { token } = getToken(REFRESH_TOKEN_KEY);
      dispatch(getAccessToken({ token }, TOKEN_URL));
      setCurrTokens();
    } else {
      setModalVisibility(true);
    }
  }, [
    dispatch
  ]);

  const getUserData = () => {
    if(isTokenExist(ACCESS_TOKEN_KEY)) {
      const { token: jwt } = getToken(ACCESS_TOKEN_KEY);
      isTokenExpired()
        ? getCurrentToken()
        : dispatch(getAccessToken({ jwt }, USER_URL));
    } else {
      setModalVisibility(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Form
        title=""
        action={USER_URL}
        values={formValues}
        fieldsData={fieldsData}
        btnCaption=""
        isBtnDisabled={isBtnDisabled}
        onSubmit={editUserData}
        classNameMod="ai_start"
      />
      {isModalVisible && (
        <Modal isModalOpen={isModalVisible} closeModal={() => setModalVisibility(false)}>
          <ModalContent children={TOKEN_ERROR_MSG} />
        </Modal>
      )}
    </>
  )
};

export default ProfileForm;
