import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from '../api';

function useFetchMovies(query, infinite = false) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (currentPage = page) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = query
        ? await searchMovies(query, currentPage)
        : await getPopularMovies(currentPage);

      const { results, total_pages, total_results } = response.data;

      setTotalPages(total_pages);
      setTotalResults(total_results);

      if (infinite) {
        setMovies((prev) => [...prev, ...results]);
        setHasMore(currentPage < total_pages);
      } else {
        setMovies(results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setMovies([]);
      setPage(1);
      setHasMore(true);
    };
  }, []);

  useEffect(() => {
    if (infinite) {
      fetchMovies(page);
    }
  }, [page]);

  useEffect(() => {
    if (!infinite) {
      fetchMovies(page);
    }
  }, [query, page]);

  const fetchMoreMovies = () => {
    if (!hasMore || loading) return;
    setPage((prev) => prev + 1);
  };

  return {
    movies,
    loading,
    page,
    setPage,
    totalPages,
    totalResults,
    hasMore,
    fetchMoreMovies,
  };
}

export default useFetchMovies;
