import {
  useMemo,
  useState,
  useEffect
} from 'react';

function useSubmitBtn(fields, validValues) {
  const [isBtnDisabled, setBtnDisabled] = useState(true);

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
