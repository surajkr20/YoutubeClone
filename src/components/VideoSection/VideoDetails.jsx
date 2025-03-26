/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../useContextHook/useContextApi";
import { useTheme } from "../../useContextHook/useTheme";
import { fetchApiForYoutubeData } from "../../utils/fetchApi";

const VideoDetails = () => {
  const { categoryId, videoId } = useParams();
  const { setLoading } = useAppContext();
  const { isDarkMode } = useTheme();
  const [selectedVideoDetails, setSelectedVideoDetails] = useState();
  const [channelData, setChannelData] = useState();
  const [comments, setComments] = useState();

  const fetchSelectedVideoDetails = async () => {
    setLoading(true);
    try {
      const data = await fetchApiForYoutubeData("videos", {
        part: "snippet, contentDetails, statistics",
        id: videoId,
      });
      setSelectedVideoDetails(data?.items[0]);
    } catch (error) {
      console.error(error, "error fetching selected videos");
    }
  };

  const fetchChannelData = async () => {
    if (selectedVideoDetails?.snippet?.channelId) {
      setLoading(true);
      try {
        const data = await fetchApiForYoutubeData(`channels`, {
          part: "snippet, contentDetails, statistics",
          id: selectedVideoDetails?.snippet?.channelData,
        });
        setChannelData(data?.items[0]);
      } catch (error) {
        console.log("error fetching channelData", error);
      }finally{
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    fetchSelectedVideoDetails();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [selectedVideoDetails]);

  return <div></div>;
};

export default VideoDetails;
