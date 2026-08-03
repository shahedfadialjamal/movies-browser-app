import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const getPopularMovies = (page = 1) => {
  return api.get(`/movie/popular?api_key=${API_KEY}&page=${page}`);
};

export const searchMovies = (query, page = 1) => {
  return api.get(
    `/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
};

export const getMovieDetails = (movieId) => {
  return api.get(`/movie/${movieId}?api_key=${API_KEY}`);
};

export const getMoviesByDate = (date, page = 1) => {
  return api.get(
    `/discover/movie?api_key=${API_KEY}&primary_release_date=${date}&page=${page}`
  );
};
