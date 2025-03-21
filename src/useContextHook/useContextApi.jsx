
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
      const res = await fetchApiForYoutubeData("videos", params);
      setVideoData(res.items);
      console.log(res.items);
    } catch (error) {
      console.error(error, "error fetching youtube results..");
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
          chart: 'mostPopular',
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
}