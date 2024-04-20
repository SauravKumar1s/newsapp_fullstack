import React from "react";

import { useDispatch } from "react-redux";
// Link for declarative navigation.
import { Link , useNavigate } from "react-router-dom";
// Action to remove an item from the wishlist.
import { removeWishlist } from "../../../constants/wishlist/wishSlice";
// toast for displaying messages, ToastContainer to render the toast messages.
import { toast, ToastContainer } from "react-toastify"; 
// CSS for toast notifications.
import "react-toastify/dist/ReactToastify.css";
// Custom hook for managing dark mode.
import { useDarkMode } from "../../organisms/context/DarkModeContext";

// TypeScript interface for the component props.
interface WishProps {
  wishlist: {
    _id: string;
    imageUrl: string;
    title: string;
    description?: string;
    lastUpdated: string;
    url: string;
    source?: string;
  };
}

const Wish: React.FC<WishProps> = ({ wishlist }) => {
  // Destructuring props to extract wish item details.
  const { _id, imageUrl, title, description, lastUpdated, url, source } = wishlist;

  // Hook to dispatch actions to the Redux store.
  const dispatch = useDispatch();
  // Hook to programmatically navigate.
  const navigate = useNavigate();

  // Function to handle wishlist item removal.
  const removeWishlistHandler = (wishlistId: string) => {
    // Dispatching action to remove the item from the wishlist.
    dispatch(removeWishlist(wishlistId));

    // Displaying success toast message.
    toast.success("Removed from Favorite", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  // Accessing the dark mode state from the custom hook.
  const { isDarkMode } = useDarkMode();

  return (
    // Dynamic class assignment based on the dark mode state.
    <div className={isDarkMode ? "dark-mode" : "light-mode bg-white"}>
      <div className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl">
        {/* Container for the toast notifications. */}
        <ToastContainer />
        {/* Link wrapping the image to navigate to the product detail page on click. */}
        <Link to={`/product/${_id}`}>
          <img
            className="w-full rounded-t-lg h-96 mx-2 my-1 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={imageUrl}
            alt={title}
          />
        </Link>
        <div className="flex flex-col justify-between p-4 leading-normal">
          {/* Displaying the last updated date. */}
          <p className="mb-3 font-bold text-gray-500">{lastUpdated}</p>
          {/* Product title as a clickable link. */}
          <Link
            to={url}
            className="text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </Link>
          {/* Displaying the source if available. */}
          <p className="mb-3 font-bold text-gray-700">{source}</p>
          {/* Button to remove the item from the wishlist. */}
          <div className="flex flex-row items-center py-1">
            <button
              onClick={() => removeWishlistHandler(_id)}
              className="text-rose-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wish;

/*
Wish Component Documentation:

Purpose:
- Renders a single wishlist item with functionality to remove it from the wishlist.

Features:
- Displays item image, title, description (optional), last updated timestamp, and source (optional) in a card layout.
- Provides a button to remove the item from the wishlist.
- Supports navigation to the product detail page on clicking the image.
- Integrates toast notifications for feedback on item removal.

Functionality:
- Uses useDispatch to dispatch the removeWishlist action, updating the Redux store state.
- Uses useNavigate for programmatic navigation.
- Employs a custom hook (useDarkMode) to apply theme-based styling dynamically.
- Leverages React Router's Link for declarative navigation to product details.

Best Practices:
- Utilizes TypeScript for prop type validation, enhancing code reliability and developer experience.
- Implements conditional styling for dark mode support.
- Demonstrates effective use of React and Redux hooks for state management and side effects.
*/
