import {
  useState,
  useEffect,
  SyntheticEvent
} from 'react';
import {
  NAME_ERROR_MSG,
  EMAIL_ERROR_MSG,
  PASSWORD_ERROR_MSG,
  CODE_ERROR_MSG
} from '../utils/constants';

import type { TCustumData } from '../types';

type TInputHook = {
  values: TCustumData<string>,
  validValues: TCustumData<boolean>;
  editedValues: TCustumData<string>;
  errorMessages: TCustumData<string>;
  setValues: (data: TCustumData<string>) => void;
  handleChange: Function;
  reset: Function;
}

const useInput = (): TInputHook => {
  const [values, setValues] = useState<TCustumData<string>>({});
  const [validValues, setValidValues] = useState<TCustumData<boolean>>({});
  const [editedValues, setEditedValues] = useState<TCustumData<string>>({});

  const regexPatterns: TCustumData<RegExp> = {
    name: /^[A-Za-zА-Яа-яЁё\s-]{2,30}$/,
    email: /^([A-Za-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
    password: /^[A-Za-z0-9_-]{8,30}$/,
    token: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  };

  const errorsData: TCustumData<string> = {
    name: NAME_ERROR_MSG,
    email: EMAIL_ERROR_MSG,
    password: PASSWORD_ERROR_MSG,
    token: CODE_ERROR_MSG
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
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
      ...Object.keys(validValues).reduce((acc: TCustumData<string>, item: string) =>
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
    errorMessages: Object.keys(validValues).reduce((acc: TCustumData<string>, item: string) =>
      Object.keys(acc).find((key: string) => key === item)
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
