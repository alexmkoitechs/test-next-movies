'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IMovie } from '@/types';
import axios from 'axios';

import Card from '@/app/components/Card';
import Loader from '@/app/components/Loader';
import Button from '@/app/components/Button';

import addIcon from '@/../public/assets/images/icons/add.svg';
import logoutIcon from '@/../public/assets/images/icons/logout.svg';

import styles from './styles.module.scss';

const Movies = () => {
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const router = useRouter();

  const handleRedirect = () => router.push('/movies/create');

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(`/api/movies`);
      setMovies(data);
      localStorage.setItem('movies', JSON.stringify(data))
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin');
  };

  // if !token -> redirect to signin
  useEffect(() => {
    fetchMovies();
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/signin');
    }

    return () => {
      fetchMovies()
    };
  }, [router]);

  if (!movies) {
    return <Loader />;
  };

  return (
    <div className={styles.movies}>
      {movies?.length === 0 ? (
        <div className={styles.empty}>
          <h2 className={styles.title}>Your movie list is empty</h2>
          <div className={styles.button__wrapper}>
            <Button type='button' label='Add a new movie' onClick={handleRedirect} />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.title_wrapper}>
              <h2 className={styles.title}>My movies</h2>
              <img src={addIcon.src} alt="icon" className={styles.add_icon} onClick={handleRedirect}/>
            </div>
            <div className={styles.logout_wrapper} onClick={handleLogout}>
              <span className={styles.logout_text}>
                Logout
              </span>
              <img src={logoutIcon.src} alt="icon" className={styles.logout_icon} />
            </div>
          </div>
          <div className={styles.content}>
            {movies?.map((movie) => (<Card key={movie.imgUrl} data={movie} />))}
          </div>
        </>
      )
    }
    </div>
  );
};

export default Movies;
