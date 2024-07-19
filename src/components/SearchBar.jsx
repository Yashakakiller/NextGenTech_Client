import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/productSearch/${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input className='searchInput'
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className='searchButton'>Search</button>
    </form>
  );
};

export default SearchBar;
