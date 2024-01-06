import {
  useState,
  useEffect,
  ChangeEvent
} from 'react';
import {
  NAME_ERROR_MSG,
  EMAIL_ERROR_MSG,
  PASSWORD_ERROR_MSG,
  CODE_ERROR_MSG
} from '../utils/constants';

import type { TCustomData } from '../types';

interface IInputHook {
  values: TCustomData<string>,
  validValues: TCustomData<boolean>;
  editedValues: TCustomData<string>;
  errorMessages: TCustomData<string>;
  setValues: (data: TCustomData<string>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: Function;
}

const useInput = (): IInputHook => {
  const [values, setValues] = useState<TCustomData<string>>({});
  const [validValues, setValidValues] = useState<TCustomData<boolean>>({});
  const [editedValues, setEditedValues] = useState<TCustomData<string>>({});

  const regexPatterns: TCustomData<RegExp> = {
    name: /^[A-Za-zА-Яа-яЁё\s-]{2,30}$/,
    email: /^([A-Za-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
    password: /^[A-Za-z0-9_-]{8,30}$/,
    token: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  };

  const errorsData: TCustomData<string> = {
    name: NAME_ERROR_MSG,
    email: EMAIL_ERROR_MSG,
    password: PASSWORD_ERROR_MSG,
    token: CODE_ERROR_MSG
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    setValidValues({
      ...validValues,
      [name]: !regexPatterns[name].test(value)
    });
  };

  const reset = () => {
    setValues({});
  };

  useEffect(() => {
    setEditedValues({
      ...Object.keys(validValues).reduce((acc, item) =>
        validValues[item]
        ? acc
        : ({
          ...acc,
          [item]: values[item]
        }),
      {})
    });
  }, [values]);

  return {
    values,
    validValues,
    editedValues,
    errorMessages: Object.keys(validValues).reduce((acc, item) =>
      Object.keys(acc).find(key => key === item)
      ? acc
      : ({
          ...acc,
          [item]: errorsData[item]
        }),
      {}),
    setValues,
    handleChange,
    reset
  };
}

export default useInput;
