// WeatherDisplay.tsx
import React, { useEffect, useState } from 'react';
import weatherService from '../services/weatherService';
import userService from '../services/userService';
import { City } from './SearchResults';
import AddToFavoritesButton from './AddToFavoritesButton';

interface WeatherDisplayProps {
  city: City;
  userId: number | null; 
  display: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, userId, display }) => {
  const [weather, setWeather] = useState<any>(null); 

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city.cityKey) return;
      try {
        const data = await weatherService.getWeatherData(city.cityKey);
        setWeather(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [city.cityKey]);

  const addToFavorites = async () => {
    if (!city.cityKey) return;
    try {
      await userService.addToFavorites(userId, city.cityKey);

    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  

  if (!city.cityKey || !weather) return null;

  return (
    <div>
      <h3>Weather for {city.localizedName}</h3>
      {/* Display detailed weather information here */}
      <p>{weather.temperature}°C, {weather.condition}</p> {/* Adjust based on your weather data */}
      <AddToFavoritesButton userId={userId} cityKey={city.cityKey} onAdd={addToFavorites} display={display} />
    </div>
  );
};

export default WeatherDisplay;
