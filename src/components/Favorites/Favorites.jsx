import React from 'react';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../favorites';
import MovieCard from '../Movies/MovieCard';
function Favorite() {
  const movies = useSelector((state) => state.favorites.favorites);
  if (movies.length === 0) {
    return (
      <div>
        <h2>No Favorite Yet</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        padding: '24px',
        placeItems: 'center',
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          type={movie.type}
          poster={movie.poster}
        />
      ))}
    </div>
  );
}
export default Favorite;
