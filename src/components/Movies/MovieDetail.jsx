import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../../api';
function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMovieDetails(movieId)
      .then((response) => {
        setMovie(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [movieId]);
  if (loading) {
    return <h2>loading..</h2>;
  }
  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <Link to="/">back</Link>
      <br />
      <br />
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie?.title}
        width="300"
      />
      <h1>{movie.title}</h1>
      <p>
        <b>Rating:</b>
        {movie.vote_average}
      </p>
      <p>{movie.overview}</p>
    </div>
  );
}
export default MovieDetail;
