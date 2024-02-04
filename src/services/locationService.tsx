
import axios from 'axios';

const getLocationSearch = async (cityName: string) => {

    let baseApiUrl = process.env.API_BASE_UR ?? "http://localhost:3000";
    try {
        const response = await axios.get(`${baseApiUrl}/api/location/search?q=${cityName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};



const locationService = {
    getLocationSearch,
};

export default locationService;
