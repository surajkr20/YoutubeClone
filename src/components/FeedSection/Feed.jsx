 
import React from 'react';
import { useAppContext } from "../../useContextHook/useContextApi";
import { useTheme } from '../../useContextHook/useTheme';
import Sidebar from "../SidebarSection/Sidebar"
import VideoList from "../VideoSection/VideoList"

const Feed = () => {
  const {loading, videoData} = useAppContext();
  const {isDarkMode} = useTheme()

  return (
    <div className={`flex flex-row h-screen ${isDarkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"}`}>
      <Sidebar/>
      <div className='w-full grow overflow-y-auto'>
        {! loading && videoData.map((item) =>(
          <div key={item?.id}>
            <VideoList video={item}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed