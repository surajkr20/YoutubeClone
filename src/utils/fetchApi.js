import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/videos";
const API_KEY = "AIzaSyA5bgPUgxPNhzTfqPDOGWIiW-Q-8UTdLpQ";

export const fetchApiForYoutubeData = async (params = {}) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                ...params,
                key: API_KEY, 
            },
        });

        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching YouTube data:", error.response?.data || error.message);
        return { items: [] }; // Return empty items to prevent app crashes
    }
};
