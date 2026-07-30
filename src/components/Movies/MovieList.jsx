import { useState } from 'react';
import MovieCard from './MovieCard';
import useFetchMovies from '../../hooks/useFetchMovies';
import { useSearchParams } from 'react-router-dom';

function MovieList({ query }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState('default');
  const { movies, loading, page, setPage, totalPages, totalResults } =
    useFetchMovies(query);

  const sortedMovies = [...movies];

  if (sortOrder === 'high') {
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (sortOrder === 'low') {
    sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
  }

  if (loading) {
    return (
      <h2
        style={{
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        Loading...
      </h2>
    );
  }

  const changePage = (newPage) => {
    setPage(newPage);
    setSearchParams({
      page: newPage,
    });
  };

  return (
    <>
      <h3
        style={{
          textAlign: 'center',
        }}
      >
        Total Results: {totalResults}
      </h3>

      <div
        style={{
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>

          <option value="high">Highest Rating</option>

          <option value="low">Lowest Rating</option>
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))',
          gap: '24px',
          padding: '24px',
          placeItems: 'center',
        }}
      >
        {sortedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            movie={movie}
            title={movie.title}
            type={movie.release_date}
            poster={movie.poster_path}
          />
        ))}
      </div>

      <div
        style={{
          textAlign: 'center',
          margin: '20px',
        }}
      >
        <button disabled={page === 1} onClick={() => changePage(page - 1)}>
          Previous
        </button>

        <span
          style={{
            margin: '0 20px',
          }}
        >
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => changePage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default MovieList;
