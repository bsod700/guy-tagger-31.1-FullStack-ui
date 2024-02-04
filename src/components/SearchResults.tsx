import React from 'react';

interface SearchResultsProps {
  cities: City[];
  onCitySelect: (city: City) => void;
}
export interface City {
    cityKey: number,
    localizedName: string
}

const SearchResults: React.FC<SearchResultsProps> = ({ cities, onCitySelect }) => {
  return (
    <div className='results'>
      <h2>Search Results:</h2>
      <ul>
        {cities.map((city, index) => (
          <li key={index} onClick={() => onCitySelect(city)}>{city.localizedName}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
