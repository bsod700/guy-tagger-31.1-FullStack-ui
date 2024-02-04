
import axios from 'axios';

const getUser = async (userID: number) => {

    let baseApiUrl = process.env.API_BASE_UR ?? "http://localhost:3000";
    try {
        const response = await axios.get(`${baseApiUrl}/api/user/getUser/${userID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

const setUser = async (name: string, userID: number) => {
    let baseApiUrl = process.env.API_BASE_UR ?? "http://localhost:3000";
    try {
        const response = await axios.post(`${baseApiUrl}/api/user/addUser?userId=${userID}&name=${name}`);
        return response.data;
    } catch (error) {
        console.error('Error update user data:', error);
        throw error;
    }
}

const addToFavorites = async (userId: number | null, cityKey: number) => {    
    let baseApiUrl = process.env.API_BASE_UR ?? "http://localhost:3000";
    try {
        const response = await axios.post(`${baseApiUrl}/api/user/addToFavorites?userId=${userId}&cityKey=${cityKey}`);
        return response.data;
    } catch (error) {
        
        console.error('Error to add to favorite to user :', error);
        throw error;
    }
}

const removeFavorite = async (userId: number | null, cityKey: number) => {
    let baseApiUrl = process.env.API_BASE_UR ?? "http://localhost:3000";
    try {
        const response = await axios.delete(`${baseApiUrl}/api/user/deleteFavorite/${cityKey}?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error to delete a favorite from user - ${userId} :`, error);
        throw error;
    }
}

const getUserFavorites = async (userId: number | null) => {

    if(!userId) return;

    let baseApiUrl = process.env.API_BASE_UR ?? "http://localhost:3000";
    try {
        const response = await axios.get(`${baseApiUrl}/api/user/${userId}/favorites`);
        return response.data;
    } catch (error) {
        console.error(`Error to delete a favorite from user - ${userId} :`, error);
        throw error;
    }
}

const userService = {
    getUser,
    setUser,
    addToFavorites,
    removeFavorite,
    getUserFavorites
};

export default userService;
