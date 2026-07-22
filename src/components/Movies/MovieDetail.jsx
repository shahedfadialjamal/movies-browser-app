import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        console.error(error);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!movie) {
    return <h2>Movie not found.</h2>;
  }

  return (
    <motion.div
      style={{ padding: '40px', color: 'white' }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
    >
      <Link to="/">← Back</Link>

      <br />
      <br />

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width="300"
      />

      <h1>{movie.title}</h1>

      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>

      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>

      <p>{movie.overview}</p>
    </motion.div>
  );
}

export default MovieDetail;
