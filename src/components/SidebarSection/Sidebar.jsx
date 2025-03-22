/* eslint-disable no-unused-vars */
import React from 'react'
import { useAppContext } from '../../useContextHook/useContextApi'
import { useTheme } from '../../useContextHook/useTheme';
// import { categories } from "../../utils/constant";
import MenuItems from './MenuItems';

const Sidebar = () => {
  const {mobileMenu, selectedCategory, setSelectedCategory} = useAppContext();
  const {isDarkMode} = useTheme();
  return (
    <div className={`md:block overflow-y-auto h-full py-4 w-[300px] mt-2 absolute md:relative z-10 ${mobileMenu ? "block" : "hidden"} ${isDarkMode ? "border-gray-700" : "border-gray-200"} ${mobileMenu ? "z-10" : "z-auto"}`}>
      <div className='flex flex-col px-5 mb-20 '>
        {/* {categories.map((item)=>{
          <MenuItems
            key={item.id}
            item={item}
            isSelected={item.id}
          />
        })} */}
      </div>
    </div>
  )
}

export default Sidebar