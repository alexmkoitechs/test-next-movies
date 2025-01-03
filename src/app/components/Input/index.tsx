import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

import styles from './styles.module.scss';

interface InputProps {
  type: 'email' | 'password' | 'text';
  placeholder: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  register: UseFormRegister<any>;
  name: string;
}

const Input: FC<InputProps> = ({ type, placeholder, register, name }) => {
  return (
    <input
      className={styles.input}
      type={type}
      autoComplete='off'
      {...register(name)} 
      placeholder={placeholder}
    />
  );
};

export default Input;
