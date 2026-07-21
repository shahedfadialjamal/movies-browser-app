import reducer, { addFavorite, removeFavorite } from './favoritesSlice';
import { describe, test, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
afterEach(() => {
  cleanup();
});

describe('favorites reducer', () => {
  test('should add favorite', () => {
    const initialState = { favorites: [] };
    const movie = {
      id: 1,
      title: 'Moana',
    };
    const state = reducer(initialState, addFavorite(movie));
    expect(state.favorites.length).toBe(1);
  });
  test('should remove favorite', () => {
    const initialState = {
      favorites: [
        {
          id: 1,
          title: 'Moana',
        },
      ],
    };
    const state = reducer(initialState, removeFavorite(1));
    expect(state.favorites.length).toBe(0);
  });
});
