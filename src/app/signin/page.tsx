'use client'

import { useState } from 'react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

import styles from './styles.module.scss';

const schema = yup.object({
  rememberMe: yup.boolean().default(false),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignIn = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log('data', data);
      const response = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', response.data.token);
      router.push('/');
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className={styles.signin}>
      <h1 className={styles.title}>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className={styles.form}>
        <div className={styles.input__wrapper}>
          <Input type="email" placeholder='Email' register={register} name='email' />
          <div className={styles.error__wrapper}>
            {errors.email ? errors.email.message : ''}
          </div>
        </div>
        <div className={styles.input__wrapper}>
          <Input type="password" placeholder='Password' register={register} name='password' />
          <div className={styles.error__wrapper}>
            {errors.password ? errors.password.message : errorMessage || ''}
          </div>
        </div>
   
        <div className={styles.input__wrapper}>
          <Checkbox register={register} name='rememberMe' label='Remember me' />
        </div>
        <div className={styles.button__wrapper}>
          <Button type='submit' label='Login' />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
