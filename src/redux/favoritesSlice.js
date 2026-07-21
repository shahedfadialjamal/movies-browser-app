import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const newState = [...state.favorites, action.payload];
      localStorage.setItem('favorites', JSON.stringify(newState));
      return {
        ...state,
        favorites: newState,
      };
    },
    removeFavorite: (state, action) => {
      const newState = state.favorites.filter(
        (movie) => movie && movie.id !== action.payload
      );
      localStorage.setItem('favorites', JSON.stringify(newState));
      return {
        ...state,
        favorites: newState,
        //state.favorites=state.favorites.filter((movie)=> movie.id!==action.payload);
        //localStorage.setItem("favorites" ,
        //   JSON.stringify(state.favorites));
      };
    },
  },
});
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
