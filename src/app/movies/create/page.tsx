'use client';

import { useState } from 'react';
import { IImageFile } from '@/types';

import Loader from '@/app/components/Loader';
import MovieForm from '@/app/components/Forms/MovieForm';

const MoviesCreate = () => {
  const [image, setImage] = useState<IImageFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <MovieForm
      image={image}
      btnText={'Submit'}
      setImage={setImage}
      setLoading={setLoading}
      title='Create a new movie'
    />
  );
};

export default MoviesCreate;
