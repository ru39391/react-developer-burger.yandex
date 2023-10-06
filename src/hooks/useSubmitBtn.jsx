import {
  useMemo,
  useState,
  useEffect
} from 'react';

import PropTypes from 'prop-types';
import { fieldPropTypes } from '../utils/proptypes';

function useSubmitBtn(fields, validValues) {
  const [isBtnDisabled, setBtnDisabled] = useState(true);

  const values = useMemo(() => Object.values(validValues), [validValues]);

  useEffect(() => {
    setBtnDisabled(
      values.length === fields.length
      ? values.some(item => item)
      : true
    );
  }, [validValues]);

  return {
    isBtnDisabled
  };
}

useSubmitBtn.propTypes = {
  fields: PropTypes.arrayOf(fieldPropTypes.isRequired).isRequired,
  validValues: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired
};

export default useSubmitBtn;
