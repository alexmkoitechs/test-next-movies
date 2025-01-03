import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

import styles from './styles.module.scss';

interface InputProps {
  label: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  register: UseFormRegister<any>;
  name: string;
}

const Input: FC<InputProps> = ({ name, label, register }) => {
  return (
    <label className={styles.wrapper}>
      <input type="checkbox" {...register(name)} className={styles.checkbox} />
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Input;
