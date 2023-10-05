import React, { useRef, useImperativeHandle } from 'react';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const PasswordField = React.forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    field: inputRef.current,
    handleInput: () => {
      console.log('Вызван произвольный метод из дочернего компонента', inputRef.current);
    }
  }));

  return (
    <PasswordInput
      itemRef={inputRef}
      {...props}
    />
  );
});

PasswordField.propTypes = {
  ref: PropTypes.string,
  //props:
};

export default PasswordField;
