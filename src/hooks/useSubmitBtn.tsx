import {
  useMemo,
  useState,
  useEffect
} from 'react';

import type { TFieldsData, TCustomData } from '../types';

interface ISubmitBtnHook {
  isBtnDisabled: boolean;
  disableBtn: Function;
}

const useSubmitBtn = (fields: TFieldsData[], validValues: TCustomData<boolean>): ISubmitBtnHook => {
  const [isBtnDisabled, setBtnDisabled] = useState<boolean>(true);

  const values = useMemo(() => Object.values(validValues), [validValues]);

  const disableBtn = () => {
    setBtnDisabled(true);
  };

  useEffect(() => {
    setBtnDisabled(
      values.length === fields.length
      ? values.some(item => item)
      : true
    );
  }, [validValues]);

  return {
    isBtnDisabled,
    disableBtn
  };
}

export default useSubmitBtn;
