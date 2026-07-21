import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movieSlice';
import favoriteReducer from './favoritesSlice';
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoriteReducer,
  },
});
