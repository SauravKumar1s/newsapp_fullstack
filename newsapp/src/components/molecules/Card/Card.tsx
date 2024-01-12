import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToWishList } from "../../../constants/wishlist/wishSlice";
import { addToHistory } from "../../../constants/historylist/historySlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "../../organisms/context/DarkModeContext";

interface CardProps {
  imageUrl: string;
  title: string;
  description?: string;
  lastUpdated: string;
  url: string;
  source?: string;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  lastUpdated,
  url,
  source,
}) => {
  const dispatch = useDispatch();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInHistory, setIsInHistory] = useState(false);

  const maxDescriptionLength = 90;
  const truncatedDescription = description
    ? description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + "..."
      : description
    : "";

  const handleAddToWishList = () => {
    // Check if the item is already in the wishlist
    if (isInWishlist) {
      toast.warning("This item is already in your Fav", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    // Add the item to the wishlist
    dispatch(
      addToWishList({
        id: "",
        imageUrl,
        title,
        description,
        lastUpdated,
        url,
        source,
      })
    );

    // Show a toast when an item is added to the wishlist
    toast.success("Added to Your Fav", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });

    setIsInWishlist(true);
  };

  const handleAddToHistory = () => {
    // Add the item to the history list
    dispatch(
      addToHistory({
        id: "",
        imageUrl,
        title,
        description,
        lastUpdated,
        url,
        source,
      })
    );

    setIsInHistory(true);
  };

  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? "dark-mode bg-black" : "light-mode "}>
      <div className="border rounded-lg shadow-lg p-4 mb-4">
        <div>
          <ToastContainer />
        </div>
        
        <img
          src={imageUrl}
          alt={title}
          className="mt-4 w-full h-[200px] rounded-lg"
        />
        <div>

        <div className="">
          <div className="text-gray-500 mt-4">{source}</div>
          <h1
            className="sm:text-2xl font-semibold text-blue-600"
            onClick={handleAddToHistory}
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h1>
          {truncatedDescription && (
            <p className="mt-2 text-gray-700" onClick={handleAddToHistory}>
              {truncatedDescription}
              {length > maxDescriptionLength && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 ml-2"
                >
                  read more
                </a>
              )}
            </p>
          )}
        </div>
          <p className="cursor-pointer py-2 text-2xl" onClick={handleAddToWishList}>
            {isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
          </p>
          <p className="mt-2 text-sm text-gray-400">{lastUpdated}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
