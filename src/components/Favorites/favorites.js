export function saveFavorite(movie) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(movie);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
export function removeFavorite(movie) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.favorites.filter((movie) => movie.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
export function getFavorite() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}
export function isFavorite(id) {
  const favorites = getFavorite();
  return favorites.some((movie) => movie.id === id);
}
