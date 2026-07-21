export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');

  if (!favorites) return [];
  try {
    const parsed = JSON.parse(favorites);
    return Array.isArray(parsed)
      ? parsed.filter((movie) => movie && movie.id != null)
      : [];
  } catch {
    return [];
  }
};
export const saveFavorite = (movie) => {
  if (!movie || movie.id == null) return;
  const favorites = getFavorites();
  if (!favorites.some((m) => m.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};
export const removeFavorite = (id) => {
  const favorites = getFavorites().filter((movie) => movie && movie.id != id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
export const isFavorite = (id) => {
  return getFavorites().some((movie) => movie && movie.id === id);
};
