import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeWishlist } from "../../../features/wishlist/wishSlice";
import { toast, ToastContainer } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "../../organisms/context/DarkModeContext";

interface WishProps {
  imageUrl: string;
  title: string;
  description?: string;
  lastUpdated: string;
  url: string;
  source?: string;
}

const Wish: React.FC<WishProps> = ({ wishlist }) => {
  const { _id, imageUrl, title, description, lastUpdated, url, source } =
    wishlist;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // remove wish item
  const removeWishlishHandler = (wishlist: typeof wishlist) => {
    dispatch(removeWishlist(wishlist));

    // Show a toast when an item is added to the wishlist
    toast.success("Remove from Favorite", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };
  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode bg-white"}>
      <div className="flex flex-col items-center  rounded-lg shadow md:flex-row md:max-w-xl ">
        <div>
          <ToastContainer />
        </div>
        <Link to={`/product/${_id}`}>
          <img
            className=" w-full rounded-t-lg h-96 mx-2 my-1 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={imageUrl}
            alt=""
          />
        </Link>
        <div className="flex flex-col justify-between p-4 leading-normal">
          {/* <h4 className="mb-2 text-xl font-bold tracking-tight text-gray-900 "> {description}</h4> */}
          <p className="mb-3 font-bold text-gray-500 ">{lastUpdated}</p>
          <Link
            to={url}
            className="text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </Link>
          <p className="mb-3 font-bold text-gray-700 ">{source}</p>
          <div className="flex flex-row items-center py-1">
            <button
              onClick={() => removeWishlishHandler(wishlist)}
              className="text-rose-600"
            >
              remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wish;
