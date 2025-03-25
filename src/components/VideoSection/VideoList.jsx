/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useTheme } from "../../useContextHook/useTheme";
import { Link } from "react-router-dom";

const VideoList = ({ video }) => {
  const { isDarkMode } = useTheme();
  const [channelData, setChannelData] = useState();
  return (
    <div>
      <Link to={`video/${video.snippet.categoryId}/${video.id}`}>
        <div className="flex flex-col mb-2">
          <div className="relative md:rounded-xl overflow-hidden">
            <img
              src={video?.snippet?.thumbnails?.medium?.url}
              alt={video.snippet.title}
              className="w-full h-full object-cover rounded-full"
            />

            <span className="absolute bottom-4 right-0 bg-gray-800 text-white text-xs p-1 m-1 rounded">
              
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoList;
