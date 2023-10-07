import React from 'react';
import useInput from '../../hooks/useInput';
import useSubmitBtn from '../../hooks/useSubmitBtn';
import Form from '../../components/form/Form';

import {
  NAME_PLS,
  PASSWORD_PLS
} from '../../utils/constants';

function ProfileForm() {
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
      value: formValues.name || 'Марк',
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
      value: formValues.email || 'mail@stellar.burgers',
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

  return (
    <Form title="" fieldsData={fieldsData} btnCaption="" isBtnDisabled={isBtnDisabled} classNameMod="ai_start" />
  )
};

export default ProfileForm;
