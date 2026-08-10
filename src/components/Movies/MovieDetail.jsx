import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMovieDetails } from '../../api';

function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showDetails, setShowDetails] = useState(false);

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
    return <h2>Loading...</h2>;
  }

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      style={{
        minHeight: '100vh',
        background: '#111',
        color: 'white',
        padding: '40px',
      }}
    >
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '20px',
        }}
      >
        Back
      </Link>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '50px',
          marginTop: '50px',
        }}
      >
        <motion.img
          layoutId={`movie-${movie.id}`}

          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}

          alt={movie.title}

          initial={{
            position: 'fixed',
            width: '350px',
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            scale: 2.5,
          }}

          animate={{
            position: 'relative',

            width: '350px',

            top: 0,

            left: 0,

            x: 0,

            y: 0,

            scale: 1,
          }}

          transition={{
            duration: 2,
            times: [0, 0.3, 1],
            ease: [0.22, 1, 0.36, 1],
          }}

          onAnimationComplete={() => {
            setShowDetails(true);
          }}

          style={{
            borderRadius: '20px',

            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        />

        {showDetails && (
          <motion.div
            initial={{
              opacity: 0,
              x: 100,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 0.6,
            }}

            style={{
              maxWidth: '600px',
            }}
          >
            <h1>{movie.title}</h1>

            <h2>Rating: {movie.vote_average}</h2>

            <h3>Release Date: {movie.release_date}</h3>

            <p
              style={{
                fontSize: '20px',
                lineHeight: '1.6',
              }}
            >
              {movie.overview}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default MovieDetail;
