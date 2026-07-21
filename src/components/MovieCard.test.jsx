import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../redux/favoritesSlice';
import MovieCard from './Movies/MovieCard';
import { describe, test, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
afterEach(() => {
  cleanup();
});
describe('movie card', () => {
  test('renders movie title', () => {
    const store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieCard id={1} title="Moana" type="movie" poster="poster.jpg" />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Moana')).toBeVisible();
  });
});
