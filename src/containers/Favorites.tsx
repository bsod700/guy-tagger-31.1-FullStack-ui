// FavoritesPage.tsx
import React, { useEffect, useState } from 'react';
import SearchResults, { City } from '../components/SearchResults';
import WeatherDisplay from '../components/WeatherDisplay'; 
import userService from '../services/userService'; 
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = JSON.parse(localStorage.getItem('user') || '{}').userId;
      if (userId) {
        const favoriteCities = await userService.getUserFavorites(userId); 
        setFavorites(favoriteCities);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const storedUserId = user.userId;
    
    if (storedUserId) {
        setUserId(Number(storedUserId));
    } else {
        setUserId(null);
    }
}, []);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  const handleRemoveFavorite = async (cityKey: number) => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').userId;
    if (userId) {
      await userService.removeFavorite(userId, cityKey);
      setFavorites(favorites.filter(city => city.cityKey !== cityKey));
    }
  };

  return (
    <div className='container'>
      <Link to="/">Go to home</Link>
      <h1>Favorite Cities</h1>
      <div className="flex">
        <SearchResults cities={favorites} onCitySelect={handleCitySelect} />
        {selectedCity && (
          <div>
            <WeatherDisplay city={selectedCity} userId={userId} display={false} />
            <button onClick={() => handleRemoveFavorite(selectedCity.cityKey)}>Remove from Favorites</button>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default FavoritesPage;
