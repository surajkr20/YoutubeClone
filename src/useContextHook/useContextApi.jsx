import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  Children,
} from "react";
import { fetchApiForYoutubeData } from "../utils/fetchApi";
 
// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext();

export const AppContext = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const fetchYoutubeData = async (params) => {
    setLoading(true);
    try {
      const res = await fetchApiForYoutubeData(params);

      console.log("Fetched Data:", res); // Debugging

      setVideoData(res?.items || []); // Prevent undefined errors
    } catch (error) {
      console.error("Error fetching YouTube results:", error);
      setVideoData([]); // Ensure the state doesn't break
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === "Home") {
        fetchYoutubeData({
          part: "snippet, contentDetails, statistics",
          regionCode: "IN",
          maxResults: 10,
        });
      } else {
        fetchYoutubeData({
          part: "snippet, contentDetails, statistics",
          chart: "mostPopular",
          regionCode: "IN",
          maxResults: 10,
          videoCategoryId: selectedCategory,
        });
      }
    }
  }, [selectedCategory]);

  return (
    <Context.Provider
      value={{
        selectedCategory,
        setMobileMenu,
        setSelectedCategory,
        videoData,
        mobileMenu,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

 
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(Context);
};
