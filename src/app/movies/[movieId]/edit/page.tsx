'use client';

import { useState, use } from 'react';
import { IImageFile, IMovie } from '@/types';

import Loader from '@/app/components/Loader';
import MovieForm from '@/app/components/Forms/MovieForm';

const MoviesEdit = ({ params }: { params: Promise<{ movieId: string }> }) => {
  const [image, setImage] = useState<IImageFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { movieId } = use(params);

  const stringMovies = localStorage.getItem('movies');
  const formattedMovies: IMovie[] = JSON.parse(stringMovies!);
  const movieData = formattedMovies.find(movie => movie.id === +movieId);

  if (!movieData) return null;

  const formattedData = {
    ...movieData,
    year: +movieData.year,
  }

  if (loading) {
    return <Loader />;
  }
  
  return (
    <MovieForm
      title='Edit'
      image={image}
      btnText={'Update'}
      setImage={setImage}
      setLoading={setLoading}
      movieData={formattedData}
    />
  );
};

export default MoviesEdit;
