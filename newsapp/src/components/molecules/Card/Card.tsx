import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToWishList } from "../../../features/wishlist/wishSlice";
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

  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? "dark-mode bg-black" : "light-mode bg-white"}>
      <div className="border rounded-lg shadow-lg p-4">
        <div>
          <ToastContainer />
        </div>
        <div className="card-content">
          <div className="text-gray-500">{source}</div>
          <h1 className="text-2xl font-semibold text-blue-600">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h1>
          {description && (
            <p className="mt-2 text-gray-700">
              {description}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 ml-2"
              >
                read more
              </a>
            </p>
          )}
          <p className="cursor-pointer" onClick={handleAddToWishList}>
            {isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
          </p>
          <p className="mt-2 text-sm text-gray-400">{lastUpdated}</p>
        </div>
        <img src={imageUrl} alt={title} className="mt-4 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default Card;
