import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Form.module.css';

function Form({
  title,
  fieldsData,
  onSubmit,
  children,
  classNameMod
}) {
  const {
    isLogged,
    isFailed,
    isSucceed,
    isRecoverySucceed,
    errorMsg
  } = useSelector(state => state.user);

  useEffect(() => {
    onSubmit({
      isLogged,
      isSucceed,
      isRecoverySucceed
    });
  }, [
    isLogged,
    isSucceed,
    isRecoverySucceed
  ]);

  return (
    <>
      <form className={`${styles.wrapper} ${classNameMod && styles[classNameMod]}`} onSubmit={(e) => e.preventDefault()}>
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
        {children}
      </form>
    </>
  )
};

export default Form;
