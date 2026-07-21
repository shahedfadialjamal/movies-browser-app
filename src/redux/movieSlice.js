import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
};
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    addFavorite: (state, action) => {
      state.movies = push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});
export const { setMovies } = movieSlice.actions;

export default movieSlice.reducer;
