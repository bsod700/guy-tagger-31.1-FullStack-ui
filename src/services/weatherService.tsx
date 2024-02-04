
import axios from 'axios';

const getWeatherData = async (cityKey: number) => {

    let baseApiUrl = process.env.API_BASE_UR ?? "http://localhost:3000";
    try {
        const response = await axios.get(`${baseApiUrl}/api/weather/current/${cityKey}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};


const weatherService = {
    getWeatherData
};

export default weatherService;
