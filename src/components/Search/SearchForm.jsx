import { useState } from 'react';
function SearchForm({ onSearch }) {
  const [search, setSearch] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="search movie"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Search</button>
      <p>You Searched For: {search}</p>
    </form>
  );
}
export default SearchForm;
