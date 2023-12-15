import {
  useMemo,
  useState,
  useEffect
} from 'react';

import { TFieldsData, TCustomData } from '../types';

type TSubmitBtnHook = {
  isBtnDisabled: boolean;
  disableBtn: Function;
}

const useSubmitBtn = (fields: TFieldsData[], validValues: TCustomData<boolean>): TSubmitBtnHook => {
  const [isBtnDisabled, setBtnDisabled] = useState<boolean>(true);

  const values = useMemo(() => Object.values(validValues), [validValues]);

  const disableBtn = (): void => {
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
