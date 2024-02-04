import React, { useState } from 'react';
import locationService from '../services/locationService'; 
import { City } from './SearchResults';

interface SearchBarProps {
  onSearch: (cities: City[]) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

// Modifications in SearchBar.tsx
const handleSearch = async () => {
  try {
    const cityData = await locationService.getLocationSearch(searchQuery);
    onSearch(cityData);
  } catch (error) {
    console.error('Error searching for city:', error);
  }
};

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

