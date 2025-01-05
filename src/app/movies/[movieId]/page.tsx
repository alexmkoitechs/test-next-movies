import { use } from 'react';

const Movie = ({ params }: { params: Promise<{ movieId: string }> }) => {
  const { movieId } = use(params);

  return (
    <div>
      <h1>Movie Details for movie with id { movieId }</h1>
    </div>
  )
}

export default Movie