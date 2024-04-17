// Importing useSelector hook from Redux to access state within the component.
import { useSelector } from "react-redux";
// Importing the HistoryChecks component to display individual history items.
import HistoryChecks from "./HistoryCheck";
// Importing the useDarkMode custom hook to manage dark mode state.
import { useDarkMode } from "../../organisms/context/DarkModeContext";

// The HistoryLists component displays a list of history items retrieved from the Redux store.
const HistoryLists = () => {
  // Retrieve the historyItems array from the Redux store's historylists state slice.
  // Provides a default value of an empty array if the state is not found.
  const { historyItems } = useSelector((state) => state.historylists) || { historyItems: [] };

  // Access the dark mode state using the useDarkMode hook.
  const { isDarkMode } = useDarkMode();

  // Sort the historyItems array in descending order based on the lastUpdated timestamp.
  const sortedHistoryItems = historyItems.slice().sort((a, b) => {
    const dateA = new Date(a.lastUpdated).getTime();
    const dateB = new Date(b.lastUpdated).getTime();
    return dateB - dateA; // Latest first
  });

  return (
    // Apply dark or light mode class based on the dark mode state.
    <div className={isDarkMode ? "dark-mode text-white" : "light-mode bg-white"}>
      <div className="">
        <div className="container mx-auto px-2 py-3">
          {/* Heading for the history list section */}
          <h1 className="text-4xl text-center py-5">My History</h1>
          {/* Grid layout to display history items */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-center">
            {/* Map through sortedHistoryItems and pass each item's props to the HistoryChecks component */}
            {sortedHistoryItems.map((historyItem) => (
              <HistoryChecks key={historyItem.id} {...historyItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryLists;

/*
HistoryLists Component Documentation:

Purpose:
- Displays a list of user's history items, allowing for a quick overview and management of previously viewed items.

Features:
- Dynamically renders a grid of HistoryChecks components based on the Redux store's history items.
- Supports dark and light themes through dynamic class application.
- Sorts history items by the lastUpdated timestamp to show the most recent items first.

Functionality:
- Retrieves history items from the Redux store's historylists slice.
- Uses the useDarkMode custom hook to determine the current theme state and applies appropriate styling.
- Sorts history items in descending order based on their lastUpdated property to ensure the latest items are shown first.

Best Practices:
- Utilizes Redux for global state management, enabling easy access to the application's history state from anywhere within the app.
- Implements a custom hook (useDarkMode) to manage theme changes cohesively across the application.
- Employs the component composition model by using HistoryChecks components within HistoryLists for displaying individual history items, promoting reusability and maintainability.
*/

