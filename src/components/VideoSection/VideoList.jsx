import React, { useEffect, useState } from "react";
import { useTheme } from "../../useContextHook/useTheme";
import { Link } from "react-router-dom";
import { formatDuration, formatPublishTime, formatViewCount } from "../../utils/helper";
import { fetchApiForYoutubeData } from "../../utils/fetchApi";

const VideoList = ({ video }) => {
  const { isDarkMode } = useTheme();
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      if (!video?.snippet?.channelId) return;

      try {
        const data = await fetchApiForYoutubeData(`channels`, {
          part: "snippet,statistics",
          id: video.snippet.channelId,
        });

        setChannelData(data?.items?.[0] || null);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelData();
  }, [video?.snippet?.channelId]);

  return (
    <div>
      <Link to={`/video/${video?.snippet?.categoryId}/${video?.id}`}>
        <div className="flex flex-col mb-2">
          {/* Video Thumbnail */}
          <div className="relative md:rounded-xl overflow-hidden">
            <img
              src={video?.snippet?.thumbnails?.medium?.url}
              alt={video?.snippet?.title}
              className="w-full h-full object-cover rounded-md mb-2"
            />
            {video?.contentDetails?.duration && (
              <span className="absolute bottom-4 right-0 bg-gray-800 text-white text-xs p-1 m-1 rounded">
                {formatDuration(video.contentDetails.duration)}
              </span>
            )}
          </div>

          {/* Video Details */}
          <div className="flex mt-3">
            {/* Channel Thumbnail */}
            {channelData?.snippet?.thumbnails?.medium?.url && (
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <img
                  src={channelData.snippet.thumbnails.medium.url}
                  alt={channelData.snippet.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Video Title & Meta Info */}
            <div className={`flex flex-col ml-3 overflow-hidden ${isDarkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"}`}>
              <h3 className="text-md font-bold truncate">{video?.snippet?.title}</h3>
              <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {video?.snippet?.channelTitle}
              </div>
              <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {video?.statistics?.viewCount ? `${formatViewCount(video.statistics.viewCount)} views • ` : ""}
                {formatPublishTime(video?.snippet?.publishedAt)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoList;
