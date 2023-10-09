import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useAuth from '../../hooks/useAuth';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';

import Form from '../../components/form/Form';

import { getAccessToken } from '../../services/actions/user';

import {
  NAME_PLS,
  PASSWORD_PLS,
  USER_URL,
  TOKEN_URL
} from '../../utils/constants';

function ProfileForm() {
  const dispatch = useDispatch();
  const { name, email } = useSelector(state => state.user);
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
    console.log('refreshed', isTokenExist('refreshToken'));

    if(isTokenExist('refreshToken')) {
      const token = getToken('refreshToken');
      dispatch(getAccessToken({ token }, TOKEN_URL));
      setCurrTokens();
    } else {
      console.error('refreshToken fail');
    }
  }, [
    dispatch
  ]);

  const getUserData = () => {
    if(isTokenExist('accessToken')) {
      const { token: jwt } = getToken('accessToken');
      console.log(jwt, isTokenExpired());
      isTokenExpired()
        ? getCurrentToken()
        : dispatch(getAccessToken({ jwt }, USER_URL));
    } else {
      console.error('accessToken fail');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
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
  )
};

export default ProfileForm;
