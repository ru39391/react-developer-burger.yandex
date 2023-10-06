import { useState } from 'react';

import {
  NAME_ERROR_MSG,
  EMAIL_ERROR_MSG,
  PASSWORD_ERROR_MSG,
} from '../utils/constants';

function useInput(initialValue) {
  const [values, setValues] = useState(initialValue);
  const [validValues, setValidValues] = useState(initialValue);

  const regexPatterns = {
    name: /^[A-Za-zА-Яа-яЁё\s-]{2,30}$/,
    email: /^([A-Za-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
    password: /^[A-Za-z0-9_-]{8,30}$/
  };

  const errorsData = {
    name: NAME_ERROR_MSG,
    email: EMAIL_ERROR_MSG,
    password: PASSWORD_ERROR_MSG
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    setValidValues({
      ...validValues,
      [name]: !regexPatterns[name].test(value)
    });
  }

  return {
    values,
    validValues,
    errorMessages: Object.keys(validValues).reduce((acc, item) => {
      if(Object.keys(acc).find(key => key === item)) {
        return acc;
      }
      return {
        ...acc,
        [item]: errorsData[item]
      };
    }, {}),
    handleChange,
  };
}

export default useInput;
