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
  TOKEN_ERROR_MSG
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
    values: formValues,
    validValues,
    errorMessages,
    handleChange,
    setValues
  } = useInput();

  const fieldsData = [
    {
      icon: 'EditIcon',
      type: 'text',
      name: 'name',
      //disabled: true,
      value: formValues.name || '',
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
      //disabled: true,
      value: formValues.email || '',
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
      disabled: false,
      value: formValues.password || '',
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
    //console.log('refreshed', isRefTokExist);

    if(isRefTokExist) {
      const { token } = refreshToken;
      dispatch(getAccessToken({ token }, TOKEN_URL));
    } else {
      setModalVisibility(true);
    }
  }, [
    isRefTokExist,
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
    isTokenExpired,
    isAccTokExist,
    dispatch
  ]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setValues({
      name,
      email,
      password: '******'
    });
  }, [
    name,
    email
  ]);

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
