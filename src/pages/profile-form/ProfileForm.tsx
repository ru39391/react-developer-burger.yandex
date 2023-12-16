import React, {FC, useMemo, useCallback, useEffect, ChangeEvent } from 'react';
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

import type { TRootState } from '../../services/store';
import type { TFieldsData } from '../../types';

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector((state: TRootState) => state.user);
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

  const fieldsData: TFieldsData[] = [
    {
      icon: 'EditIcon',
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
      icon: 'EditIcon',
      type: 'email',
      name: 'email',
      value: values.email || '',
      placeholder: 'Логин',
      error: validValues.email === undefined ? false : validValues.email,
      errorText: errorMessages.email || '',
      //@ts-ignore
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e),
    },
    {
      icon: 'EditIcon',
      name: 'password',
      value: values.password || '',
      placeholder: PASSWORD_PLS,
      error: validValues.password === undefined ? false : validValues.password,
      errorText: errorMessages.password || '',
      //@ts-ignore
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e)
    }
  ];

  const getCurrentToken = useCallback(() => {
    if(isRefTokExist) {
      const token: string | undefined = typeof refreshToken === 'object' && refreshToken !== undefined ? refreshToken.token : undefined;
      //@ts-ignore
      dispatch(getAccessToken({ token }, TOKEN_URL));
    } else {
      setModalVisibility(true);
    }
  }, [
    dispatch
  ]);

  const getUserData = useCallback(() => {
    if(isAccTokExist) {
      const jwt: string | undefined = typeof accessToken === 'object' && accessToken !== undefined ? accessToken.token : undefined;
      isTokenExpired
        ? getCurrentToken()
        //@ts-ignore
        : dispatch(getAccessToken({ jwt }, USER_URL));
    } else {
      setModalVisibility(true);
    }
  }, [
    isTokenExpired,
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

  const setDefaultValues = () => {
    setValues({
      name,
      email,
      password: PASSWORD_DEFAULT_VAL
    });
  };

  const handleSubmit = useCallback(() => {
    if(isTokenExpired) {
      getCurrentToken();
    }

    //@ts-ignore
    dispatch(updateData({ values: updatedValues }, USER_URL));
  }, [
    updatedValues,
    dispatch
  ]);

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
        fieldsData={fieldsData}
        onSubmit={handleSubmit}
        classNameMod="ai_start">
        <FormButton
          isBtnGroup={true}
          isBtnDisabled={!Object.values(updatedValues).length}
          handleBtn={setDefaultValues}
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
