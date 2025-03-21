
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/videos";
const API_KEY = "AIzaSyA5bgPUgxPNhzTfqPDOGWIiW-Q-8UTdLpQ";

export const fetchApiForYoutubeData = async(endpoints, params={}) =>{
    try {
        const response = await axios.get(`${BASE_URL}/${endpoints}`,{
            params: {
                ...params,
                key: API_KEY,
            }
        })
        console.log('this is my response', response.data);
        return response.data;
    } catch (error) {
        console.error(error, "error fetching youtube data");
    }
}