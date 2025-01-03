import { FC } from 'react';

import styles from './styles.module.scss';

interface InputProps {
  label: string;
  type: 'submit' | 'reset' | 'button' | undefined;
}

const Input: FC<InputProps> = ({ type, label }) => {
  return (
    <button type={type} className={styles.button}>{label}</button>
  );
};

export default Input;
