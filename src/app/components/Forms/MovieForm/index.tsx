import { FC, useEffect } from 'react';
import { IImageFile, IMovieFormInputs } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';

import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import DropImage from '@/app/components/DropImage';

import styles from './styles.module.scss';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  year: yup.number().min(4, 'Year must have 4 characters').required('Year is required'),
}).required();

interface InputProps {
  title: string;
  btnText: string;
  image: IImageFile | null;
  movieData?: IMovieFormInputs;
  setLoading: (data: boolean) => void;
  setImage: (image: IImageFile | null) => void;
}

const MovieForm: FC<InputProps> = ({ title, btnText, image, movieData, setImage, setLoading }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<IMovieFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: async () => movieData! || {},
  });

  const handleSave = async (inputValues: IMovieFormInputs) => {
    if (!image) {
      alert('Please select an image before saving!');
      return;
    }

    console.log('movieData', movieData)

    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('title', inputValues.title);
    formData.append('year', inputValues.year.toString());

    if (movieData?.id) {
      formData.append('id', movieData.id.toString());
    }

    try {
      const res = await axios.post('/api/movies/upload', formData);

      if (res.data.success) router.push('/movies');
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const onCancel = () => router.push('/movies');

  useEffect(() => {
    if(movieData?.imgUrl) {
      setImage({ preview: movieData.imgUrl } as IImageFile);
    }
  }, [])

  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <form onSubmit={handleSubmit(handleSave)} autoComplete='off' className={styles.form}>
        <div className={styles.left}>
          <DropImage image={image} setImage={setImage} />
        </div>

        <div className={styles.right_up}>
          <div className={styles.input__wrapper}>
            <Input type="text" placeholder='Title' register={register} name='title' />
            <div className={styles.error__wrapper}>
              {errors.title ? errors.title.message : ''}
            </div>
          </div>
          <div className={styles.input__wrapper_second}>
            <Input type="text" placeholder='Publishing year' register={register} name='year' />
            <div className={styles.error__wrapper}>
              {errors.year ? errors.year.message : ''}
            </div>
          </div>
        </div>

        <div className={styles.right_down}>
          <Button type='button' label='Cancel' onClick={onCancel} view='secondary' />
          <Button type='submit' label={btnText}/>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
