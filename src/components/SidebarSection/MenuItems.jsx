import React from "react";
import { useTheme } from "../../useContextHook/useTheme";

const MenuItems = ({ item, isSelected, onClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      onClick={item.type === "category" ? onClick : undefined}
      className={`px-4 py-3 flex items-center space-x-4 rounded-md cursor-pointer 
        ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-100"} 
        ${isSelected ? (isDarkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
    >
      {/* Item Icon */}
      <span className="text-xl">{item.icon}</span>

      {/* Item Name */}
      <span className="font-medium">{item.name}</span>
    </div>
  );
};

export default MenuItems;
