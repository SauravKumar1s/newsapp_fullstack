// HeaderNavigationMenu.tsx
import React, { useState } from "react";
import { SearchComponent } from "../../molecules/Search/Search";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { AiFillHeart } from "react-icons/ai";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../../../components/organisms/Navigation/HeaderNavigationMenu.styles.css";

interface HeaderProps {
  title: string;
  isAuthenticated: boolean;
}

const HeaderNavigationMenu: React.FC<HeaderProps> = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const auth = localStorage.getItem("email");

  return (
    <nav
      className={`p-4 ${
        isDarkMode ? "dark-mode-gradient" : "light-mode bg-blue-500"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center ">
        <Link to="/">
          <h1 className="lg:text-2xl text-xl font-bold text-white">
            News Aggregator
          </h1>
        </Link>

        <div className="flex items-center">
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {/* Hamburger menu icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          <div
            className={`${
              showMenu ? "block" : "hidden"
            } lg:hidden absolute top-12 left-0 right-0 ${
              isDarkMode ? "dark-mode" : "bg-blue-500"
            }`}
          >
            {auth ? (
              <div className="container mx-auto p-4">
                <Link
                  to="/"
                  className="block text-white hover:text-blue-200 py-2"
                >
                  Home
                </Link>
                <div className="text-white hover:text-blue-200 py-2">
                  {localStorage.getItem("email")}
                </div>
          
                <Link
                  to="/fav"
                  className="text-white hover:text-blue-200 text-2xl py-2"
                >
                  <AiFillHeart />
                </Link>
                <div
                  className="text-white hover:text-blue-200 text-2xl cursor-pointer py-2"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
                </div>
                <div
                  className="text-white hover:text-blue-200 py-2"
                  onClick={() => {
                    localStorage.clear();
                    navigate("login");
                  }}
                >
                  logout
                </div>
              </div>
            ) : (
              <>
                 <div className="container mx-auto p-4">
                 <div
                  className="text-white hover:text-blue-200 text-2xl cursor-pointer py-2"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
                </div>
                <Link to="/login" className="text-white hover:text-blue-200 ">
                  Login
                </Link>
              </div>
          
              </>
            )}
            {/* Mobile menu */}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {auth ? (
              <>
                <SearchComponent />
                <Link to="/" className="text-white hover:text-blue-200">
                  Home
                </Link>
                <div className="text-white hover:text-blue-200">
                  {localStorage.getItem("email")}
                </div>
                <Link to="/history" className="text-white hover:text-blue-200 ">
                  History
                </Link>
                <Link
                  to="/fav"
                  className="text-white hover:text-blue-200 text-2xl"
                >
                  <AiFillHeart />
                </Link>

                <div
              className="text-white hover:text-blue-200 text-2xl cursor-pointer"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
            </div>
                
                <div
                  className="text-white hover:text-blue-200 cursor-pointer"
                  onClick={() => {
                    localStorage.clear();
                    navigate("login");
                  }}
                >
                  logout
                </div>
              </>
            ) : (
              <>
                       <Link to="/login" className="text-white hover:text-blue-200 ">
                Login
              </Link>

              <div
              className="text-white hover:text-blue-200 text-2xl cursor-pointer"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
            </div>
              </>
     
              
            )}
            {/* Desktop menu */}

          
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNavigationMenu;
