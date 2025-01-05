import { FC } from 'react';

import styles from './styles.module.scss';

interface IBtn {
  label: string;
  onClick?: () => void;
  view?: 'primary' | 'secondary';
  type: 'submit' | 'reset' | 'button' | undefined;
}

const Button: FC<IBtn> = ({ type, view='primary', label, onClick }) => (
  <button type={type} className={`${styles.button} ${styles[view]}`} onClick={onClick}>{label}</button>
)

export default Button;
