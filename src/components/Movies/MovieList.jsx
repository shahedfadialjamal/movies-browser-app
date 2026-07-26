import { use, useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from '../../api';
import MovieCard from './MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../../redux/movieSlice';
import { useSearchParams } from 'react-router-dom';

function MovieList({ query }) {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortorder, setSortOrder] = useState('default');

  useEffect(() => {
    setPage(1);
  }, [sortorder]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    setLoading(true);

    const fetchMovies = query
      ? searchMovies(query, page)
      : getPopularMovies(page);

    fetchMovies
      .then((response) => {
        dispatch(setMovies(response.data.results));
        setTotalPages(response.data.total_pages);
        setTotalResults(response.data.total_results);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }, [query, page]);

  const sortedMovies = [...movies];

  if (sortorder === 'high') {
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (sortorder === 'low') {
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
          marginBottom: '2px',
        }}
      >
        <select
          value={sortorder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="high">Highest Rating</option>
          <option value="low">Low Rating</option>
        </select>
      </div>

      <div
        style={{
          display: 'grid',

          gridTemplateColumns: 'repeat(auto-fit, minmax(250px ,1fr))',

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
            tybe={movie.release_date}
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
        <button
          onClick={() => {
            const newPage = page - 1;

            setPage(newPage);

            setSearchParams({
              page: newPage,
            });
          }}
        >
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
          onClick={() => {
            const newPage = page + 1;

            setPage(newPage);

            setSearchParams({
              page: newPage,
            });
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default MovieList;
