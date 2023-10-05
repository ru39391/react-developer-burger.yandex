import { useRef, useEffect } from 'react';
import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../../components/wrapper/Wrapper';
import FormFooter from '../../components/form-footer/FormFooter';
import PasswordField from '../../components/password-field/PasswordField';
import PropTypes from 'prop-types';
import styles from './Form.module.css';

function Form({
  title,
  btnCaption,
  children,
  inputs
}) {
  return (
    <Wrapper title="" isFormHolder={true}>
      <form className={`${styles.wrapper} mb-20`}>
        <div className={`${styles.title} text text_type_main-medium mb-6`}>{title}</div>
        <fieldset className={`${styles.fieldset} mb-4`}>
          {inputs.map((item, index) => (
            item.type === 'password'
            ? <PasswordInput
              key={index}
              {...item}
            />
            : <Input
              key={index}
              {...item}
            />
          ))}
        </fieldset>
        <Button htmlType="submit" type="primary" size="medium">{btnCaption}</Button>
      </form>
      <FormFooter children={children} />
    </Wrapper>
  )
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  btnCaption: PropTypes.string.isRequired,
  children: PropTypes.node,
  //inputs:
};

export default Form;
