import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToWishList } from "../../../constants/wishlist/wishSlice";
import { addToHistory } from "../../../constants/historylist/historySlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "../../organisms/context/DarkModeContext";

// Interface defining the shape of props expected by the Card component
interface CardProps {
  imageUrl: string;
  title: string;
  description?: string;
  lastUpdated: string;
  url: string;
  source?: string;
}

// Card component for displaying individual news items with interactive functionality
const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  lastUpdated,
  url,
  source,
}) => {
  const dispatch = useDispatch();
  const [isInWishlist, setIsInWishlist] = useState(false); // Tracks if the item is in the wishlist
  const [isInHistory, setIsInHistory] = useState(false); // Placeholder state, functionality not fully implemented here

  // Truncates the description to a max length, appending "..." if cut off
  const maxDescriptionLength = 90;
  const truncatedDescription = description
    ? description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + "..."
      : description
    : "";

  // Handles adding an item to the wishlist, with user feedback
  const handleAddToWishList = () => {
    if (isInWishlist) {
      toast.warning("This item is already in your Fav", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    dispatch(
      addToWishList({
        id: "", // ID would ideally be dynamically generated or fetched
        imageUrl,
        title,
        description,
        lastUpdated,
        url,
        source,
      })
    );

    toast.success("Added to Your Fav", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });

    setIsInWishlist(true); // Updates state to reflect the item is now in the wishlist
  };

  // Placeholder function to simulate adding an item to a history list
  const handleAddToHistory = () => {
    dispatch(
      addToHistory({
        id: "", // Similar to wishlist, ID management could be enhanced
        imageUrl,
        title,
        description,
        lastUpdated,
        url,
        source,
      })
    );

    setIsInHistory(true); // Sets the item as added to history (functionality not fully shown)
  };

  const { isDarkMode } = useDarkMode(); // Accesses the dark mode state from context

  // Render function for the Card component
  return (
    <div className="border rounded-lg p-4 mt-10 mb-10">
      <ToastContainer />
      <img src={imageUrl} alt={title} className="mt-4 w-full rounded-lg" />
      <div>
        <div className="text-gray-500 mt-4">{source}</div>
        <h1 className="sm:text-2xl font-semibold text-blue-600" onClick={handleAddToHistory}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h1>
        {truncatedDescription && (
          <p className="mt-2 text-gray-500" onClick={handleAddToHistory}>
            {truncatedDescription}
            {/* Conditional rendering for the "read more" link */}
          </p>
        )}
        {/* Wishlist icon, changes based on whether the item is in the wishlist */}
        <p className="cursor-pointer py-2 text-2xl" onClick={handleAddToWishList}>
          {isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
        </p>
        <p className="mt-2 text-sm text-gray-400">{lastUpdated}</p>
      </div>
    </div>
  );
};

export default Card;

/**
 * Documentation for Card Component
 *
 * Overview:
 * The `Card` component is a customizable element designed to display news items within the application. It features
 * interactive components like a wishlist toggle and supports dynamic content rendering, such as titles, descriptions,
 * and images. Additionally, it integrates with Redux for state management and provides user feedback through toast notifications.
 *
 * Props:
 * - `imageUrl`: URL of the image to display on the card.
 * - `title`: Title of the news item.
 * - `description`: Optional description of the news item, truncated for length.
 * - `lastUpdated`: Timestamp or date indicating when the news item was last updated.
 * - `url`: Link to the full news article.
 * - `source`: Source of the news item.
 *
 * Functionality:
 * - Users can add news items to a wishlist, with visual feedback provided by changing the heart icon and toast messages.
 * - The component is designed to be reusable across different parts of the application where news items need to be displayed.
 *
 * Usage:
 * - Import the `Card` component where needed and pass the appropriate props based on the news item data to be displayed.
 * - Ensure Redux store and reducers are properly set up for wishlist and history functionality to work as expected.
 *
 * Example:
 * ```jsx
 * <Card
 *   imageUrl="path/to/image.jpg"
 *   title="News Title"
 *   description="Brief description of the news item."
 *   lastUpdated="2023-01-01"
 *   url="https://example.com/news"
 *   source="News Source"
 * />
 * ```
 *
 * This component exemplifies a pattern for displaying and interacting with lists of items within a React application,
 * with particular focus on user engagement and feedback.
 */
