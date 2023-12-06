import React from "react";
import { SearchComponent } from "../../molecules/Search/Search";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { AiFillHeart } from "react-icons/ai";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


interface HeaderProps {
  title: string;
}


const HeaderNavigationMenu: React.FC<HeaderProps> = ({ title }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <nav className={`p-4 ${isDarkMode ? 'dark-mode' : 'light-mode bg-blue-500'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">News Aggregator</h1>
        </Link>

        <div className="flex items-center space-x-4">
          <SearchComponent />
          <Link to="/" className="text-white hover:text-blue-200">
            Home
          </Link>
          <div className="text-white hover:text-blue-200">
{localStorage.getItem('email')}
            </div>
          <div className="text-white hover:text-blue-200 cursor-pointer" onClick={() => {
            localStorage.clear()
            navigate("login")
          }}>
            logout
          </div>
          <Link to="/fav" className="text-white hover:text-blue-200 text-2xl">
            <AiFillHeart />
          </Link>
          <div className="text-white hover:text-blue-200 text-2xl cursor-pointer" onClick={toggleDarkMode}>
            {/* Assuming IoSunnyOutline and IoMoonOutline are properly imported */}
            {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNavigationMenu;

