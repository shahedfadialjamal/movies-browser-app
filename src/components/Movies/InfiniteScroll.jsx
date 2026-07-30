import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from './MovieCard';
import useFetchMovies from '../../hooks/useFetchMovies';

function InfiniteScrollPage() {
  const { movies, hasMore, fetchMoreMovies, loading } = useFetchMovies(
    '',
    true
  );

  return (
    <InfiniteScroll
      dataLength={movies.length}

      next={fetchMoreMovies}

      hasMore={hasMore}

      loader={
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          Loading...
        </h2>
      }

      endMessage={
        <h3
          style={{
            textAlign: 'center',
          }}
        >
          No More Movies
        </h3>
      }
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))',

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
