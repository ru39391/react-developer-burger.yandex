import React from 'react';
import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../../components/wrapper/Wrapper';
import PropTypes from 'prop-types';
import styles from './Form.module.css';

import { fieldPropTypes } from '../../utils/proptypes';

function Form({
  title,
  btnCaption,
  children,
  fieldsData,
  isBtnDisabled
}) {
  return (
    <Wrapper title="" isFormHolder={true}>
      <form className={`${styles.wrapper} mb-20`}>
        <div className={`${styles.title} text text_type_main-medium mb-6`}>{title}</div>
        <fieldset className={`${styles.fieldset} mb-4`}>
          {fieldsData.map((item, index) => (
            item.name === 'password'
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
        <Button htmlType="submit" type="primary" size="medium" disabled={isBtnDisabled}>{btnCaption}</Button>
      </form>
      <div className={styles.footer}>{children}</div>
    </Wrapper>
  )
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  btnCaption: PropTypes.string.isRequired,
  children: PropTypes.node,
  isBtnDisabled: PropTypes.bool.isRequired,
  fieldsData: PropTypes.arrayOf(fieldPropTypes.isRequired).isRequired
};

export default Form;
