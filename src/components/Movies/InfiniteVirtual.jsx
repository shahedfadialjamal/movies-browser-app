import { useEffect, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { getPopularMovies } from '../../api';
import MovieCard from './MovieCard';

function InfiniteScrollPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Infinity);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const COLUMN_COUNT = 3;
  const COLUMN_WIDTH = 320;
  const ROW_HEIGHT = 460;

  const fetchMovies = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await getPopularMovies(page);

      setMovies((prev) => [...prev, ...response.data.results]);

      setTotalPages(response.data.total_pages);

      if (page >= response.data.total_pages) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * COLUMN_COUNT + columnIndex;
    const movie = movies[index];

    if (!movie) {
      return <div style={style}></div>;
    }

    return (
      <div style={{ ...style, padding: 10, placeItems: 'center' }}>
        <MovieCard
          id={movie.id}
          title={movie.title}
          releaseDate={movie.release_date}
          poster={movie.poster_path}
        />
      </div>
    );
  };

  const rowCount = Math.ceil(movies.length / COLUMN_COUNT);

  return (
    <Grid
      columnCount={COLUMN_COUNT}
      columnWidth={COLUMN_WIDTH}
      rowCount={rowCount}
      rowHeight={ROW_HEIGHT}
      width={COLUMN_WIDTH * COLUMN_COUNT}
      height={700}

      onItemsRendered={({ visibleRowStopIndex }) => {
        if (hasMore && !loading && visibleRowStopIndex >= rowCount - 2) {
          console.log('Loading page:', page);
          fetchMovies();
        }
      }}
    >
      {cell}
    </Grid>
  );
}

export default InfiniteScrollPage;
