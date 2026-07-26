import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPopularMovies } from '../../api';
import MovieCard from './MovieCard';

function InfiniteScrollPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async () => {
    if (!hasMore) return;

    try {
      const response = await getPopularMovies(page);

      setMovies((prev) => [...prev, ...response.data.results]);

      const nextPage = page + 1;
      setPage(nextPage);

      if (nextPage > response.data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={fetchMovies}
      hasMore={hasMore}
      loader={<h2 style={{ textAlign: 'center' }}>Loading...</h2>}
      endMessage={<h3 style={{ textAlign: 'center' }}>No More Movies</h3>}
    >
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
            type={movie.release_date}
            poster={movie.poster_path}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteScrollPage;
