import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies, getMoviesByDate } from '../api';

function useFetchMovies(query, selectedDate) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        let response;

        if (selectedDate) {
          response = await getMoviesByDate(selectedDate, page);
        } else if (query) {
          response = await searchMovies(query, page);
        } else {
          response = await getPopularMovies(page);
        }

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setTotalResults(response.data.total_results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, selectedDate, page]);

  return {
    movies,
    loading,
    page,
    setPage,
    totalPages,
    totalResults,
  };
}

export default useFetchMovies;
