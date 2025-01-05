import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { IMovie } from '@/types';
import Image from 'next/image';

import styles from './styles.module.scss';

interface ICard {
  data: IMovie;
}

const Card: FC<ICard> = ({ data }) => {
  const router = useRouter();
  const handleClick = () => router.push(`/movies/${data.id}/edit`);

  return (
    <div className={styles.card} onClick={() => handleClick()}>
      <div className={styles.img_wrapper}>
        <Image src={data.imgUrl} alt="image" fill style={{ objectFit: 'cover' }} />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.year}>{data.year}</p>
      </div>
    </div>
  );
};

export default Card;
