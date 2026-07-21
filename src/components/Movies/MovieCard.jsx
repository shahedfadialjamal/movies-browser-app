import { Link } from 'react-router-dom';
import { addFavorite, removeFavorite } from '../../redux/favoritesSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../../redux/movieSlice';
function MovieCard({ id, title, type, poster }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites) || [];
  const favorite = favorites?.some(
    (movie) => movie && typeof movie === 'object' && movie.id === id
  );
  const handleFavorite = () => {
    if (favorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(
        addFavorite({
          id,
          title,
          type,
          poster,
        })
      );
    }
  };

  return (
    <div
      className="movie-card"
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '10px',
        textAlign: 'center',
      }}
    >
      <Link
        to={`/movie/${id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          width="180"
        />
        <h3>{title}</h3>
        <p>{type}</p>
      </Link>
      <button onClick={handleFavorite}>
        {favorite ? ' - remove' : ' + add to fav'}
      </button>
    </div>
  );
}

export default MovieCard;
