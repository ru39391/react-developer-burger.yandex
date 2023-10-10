import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Form.module.css';

import { fieldPropTypes, valuePropTypes } from '../../utils/proptypes';
import { fetchData } from '../../services/actions/user';

function Form({
  title,
  action,
  values,
  fieldsData,
  isBtnDisabled,
  onSubmit,
  btnCaption,
  children,
  classNameMod
}) {
  const dispatch = useDispatch();
  const {
    isLogged,
    isFailed,
    isSucceed,
    userRequest,
    errorMsg
  } = useSelector(state => state.user);

  const handleSubmit = useCallback(() => {
    dispatch(fetchData({ values }, action));
  }, [
    values,
    action,
    dispatch
  ]);

  useEffect(() => {
    onSubmit({ isLogged, isSucceed });
  }, [
    isLogged,
    isSucceed
  ]);

  return (
    <>
      <form className={`${styles.wrapper} ${classNameMod && styles[classNameMod]} mb-20`} onSubmit={(e) => e.preventDefault()}>
        {title && <div className={`${styles.title} text text_type_main-medium mb-6`}>{title}</div>}
        {isFailed && <div className={`${styles.title} text text_type_main-default mb-4`} style={{ color: '#e52b1a' }}>{errorMsg}</div>}
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
        {btnCaption && <Button htmlType="submit" type="primary" size="medium" disabled={isBtnDisabled || userRequest || isSucceed} onClick={handleSubmit}>{btnCaption}</Button>}
      </form>
      {children && <div className={styles.footer}>{children}</div>}
    </>
  )
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  values: valuePropTypes.isRequired,
  fieldsData: PropTypes.arrayOf(fieldPropTypes.isRequired).isRequired,
  isBtnDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  btnCaption: PropTypes.string.isRequired,
  children: PropTypes.node,
  classNameMod: PropTypes.string
};

export default Form;
