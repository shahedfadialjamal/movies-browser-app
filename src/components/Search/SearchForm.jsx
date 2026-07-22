import { use } from 'react';
import { useState, useEffect } from 'react';
function SearchForm({ onSearch }) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setdebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setdebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch]);
  return (
    <div>
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
