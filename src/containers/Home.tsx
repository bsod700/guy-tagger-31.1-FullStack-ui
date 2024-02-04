// HomePage.tsx
import React, { useEffect, useState } from 'react';
import SearchResults, { City } from '../components/SearchResults';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';

const HomePage: React.FC = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
      
    const handleCitySelect = (city: City) => {
        setSelectedCity({ cityKey: city.cityKey, localizedName: city.localizedName });
    };
    const handleSearch = (searchedCities: City[]) => {
        setCities(searchedCities);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const storedUserId = user.userId;
        
        if (storedUserId) {
            setUserId(Number(storedUserId));
        } else {
            setUserId(null);
        }
    }, []);

    return (
        <div className='container home'>
            <h1>Home Page</h1>
            
                <SearchBar onSearch={handleSearch} />
            <div className='flex'>
                <SearchResults cities={cities} onCitySelect={handleCitySelect} />
                {
                    selectedCity && <WeatherDisplay city={selectedCity} userId={userId} display={true} />
                }
            </div>
        </div>
    );
};

export default HomePage;
