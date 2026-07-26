import { useState, useEffect } from 'react';

function SearchForm({ onSearch }) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="search movie"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>You Searched For: {search}</p>
    </div>
  );
}

export default SearchForm;
