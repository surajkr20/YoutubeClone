import React from 'react';
import { useAppContext } from '../../useContextHook/useContextApi';
import { useTheme } from '../../useContextHook/useTheme';
import { categories, menuItems } from "../../utils/constant";
import MenuItems from './MenuItems';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { mobileMenu, selectedCategory, setSelectedCategory } = useAppContext();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleCategoryClick = (id, name) => {
    setSelectedCategory(id); // ✅ Properly updating the selected category
    if (name === 'Home') {
      navigate('/');
    }
  };

  return (
    <div 
      className={`md:block overflow-y-auto h-full py-4 w-[300px] mt-2 absolute md:relative 
                  ${mobileMenu ? "block z-10" : "hidden"} 
                  ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <div className='flex flex-col px-5 mb-20'>
        
        {categories.map((item) => (
          <MenuItems
            key={item.id}
            item={item}
            isSelected={item.id === selectedCategory}
            onClick={() => handleCategoryClick(item.id, item.name)}
          />
        ))}

        <hr className={`my-3 ${isDarkMode ? "border-gray-600" : "border-gray-300"}`} />

        {menuItems.map((item) => (
          <MenuItems key={item.name} item={item} isSelected={false} />
        ))}

        <hr className={`my-3 ${isDarkMode ? "border-gray-600" : "border-gray-300"}`} />

        <div className='flex items-center text-sm justify-center'>
          Made by - <span className="font-semibold ml-1"><Link to={'https://www.linkedin.com/in/suraj-kumar-5b48b9254/'}>Suraj Kumar</Link></span>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
