import React from "react";
// useDispatch hook for dispatching actions to the Redux store.
import { useDispatch } from "react-redux";
// Action from historySlice to remove an item from history.
import { removeFromHistory } from "../../../constants/historylist/historySlice";
// Toast notifications for user feedback.
import { toast, ToastContainer } from "react-toastify";
// Importing CSS for react-toastify.
import "react-toastify/dist/ReactToastify.css";
// Custom hook to manage dark mode state.
import { useDarkMode } from "../../organisms/context/DarkModeContext";

// TypeScript interface to define the props the component expects.
interface HistoryChecksProps {
  id: string;
  imageUrl: string;
  title: string;
  description?: string; // Optional property
  lastUpdated: string;
  url: string;
  source?: string; // Optional property
}

// The HistoryChecks component displays a single history item with the ability to remove it.
const HistoryChecks: React.FC<HistoryChecksProps> = ({
  id,
  imageUrl,
  title,
  description,
  lastUpdated,
  url,
  source,
}) => {
  // Hook to dispatch actions to the Redux store.
  const dispatch = useDispatch();
  // Accessing dark mode state using the custom hook.
  const { isDarkMode } = useDarkMode();

  // Handler function to remove an item from history.
  const removeHistoryItemHandler = (historyItemId: string) => {
    // Dispatching removeFromHistory action with the item's id.
    dispatch(removeFromHistory(historyItemId));
    // Displaying success notification.
    toast.success("Removed from History", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  return (
    // Conditional styling based on dark mode state.
    <div className={isDarkMode ? "dark-mode" : "light-mode bg-white"}>
      {/* Container for the history item with styling for both mobile and desktop views. */}
      <div className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl">
        {/* ToastContainer for displaying notifications. */}
        <div>
          <ToastContainer />
        </div>
        {/* Image of the history item. */}
        <img
          className="w-full rounded-t-lg h-96 mx-2 my-1 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={imageUrl}
          alt=""
        />
        {/* Container for the history item's details. */}
        <div className="flex flex-col justify-between p-4 leading-normal">
          {/* Displaying the last updated time. */}
          <p className="mb-3 font-bold text-gray-500">{lastUpdated}</p>
          {/* Title of the item as a clickable link. */}
          <a
            href={url}
            className="text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
          {/* Source of the history item, if available. */}
          <p className="mb-3 font-bold text-gray-700">{source}</p>
          {/* Button to remove the item from history. */}
          <div className="flex flex-row items-center py-1">
            <button
              onClick={() => removeHistoryItemHandler(id)} // Fixed to use id instead of imageUrl
              className="text-rose-600"
            >
              Remove from History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryChecks;

/*
HistoryChecks Component Documentation:

Purpose:
- Displays a single history item with an option to remove it from the history list.

Features:
- Shows the item's image, title, source, last updated time, and a removal button.
- Supports dark mode styling.

Functionality:
- Uses the useDispatch hook from Redux to dispatch the removeFromHistory action.
- Utilizes custom useDarkMode hook for theme management.
- Provides user feedback using toast notifications on item removal.

Best Practices:
- TypeScript interface for prop validation enhances type safety and readability.
- Conditional rendering and styling based on the dark mode state.
- Separation of concerns by handling state management and UI rendering distinctly.
*/
