import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of a single history item
interface HistoryItem {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  lastUpdated: string;
  url: string;
  source?: string;
}

// Define the shape of the history state within the Redux store
interface HistoryState {
  historyItems: HistoryItem[];
}

// Initial state, attempting to load any pre-existing history from localStorage or default to an empty array
const initialState: HistoryState = {
  historyItems: (localStorage.getItem("historyItems")
    ? JSON.parse(localStorage.getItem("historyItems")!)
    : []) as HistoryItem[],
};


// The slice for managing browsing history, including adding, removing, and clearing history
export const historyListSlice = createSlice({
  name: "historyList",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<HistoryItem>) => {
      const existingIndex = state.historyItems.findIndex(
        (item) => item.imageUrl === action.payload.imageUrl
      );

      if (existingIndex === -1) {
        // If the item doesn't exist, add it to the beginning of the list
        state.historyItems.unshift(action.payload);
      } else {
        // If the item exists, move it to the beginning of the list
        const existingItem = state.historyItems[existingIndex];
        state.historyItems.splice(existingIndex, 1);
        state.historyItems.unshift(existingItem);
      }

      localStorage.setItem("historyItems", JSON.stringify(state.historyItems));
    },

    // Action to remove a specific item from the history
    removeFromHistory: (state, action: PayloadAction<string>) => {
      const updatedHistory = state.historyItems.filter(
        (item) => item.imageUrl !== action.payload
      );

      state.historyItems = updatedHistory;
      // Update localStorage to reflect the removal
      localStorage.setItem("historyItems", JSON.stringify(state.historyItems));
    },

    // Action to clear all history items
    clearHistory: (state) => {
      state.historyItems = [];
      // Clear the history in localStorage as well
      localStorage.setItem("historyItems", JSON.stringify(state.historyItems));
    },
  },
});

// Exporting the actions for use within components
export const { addToHistory, removeFromHistory, clearHistory } = historyListSlice.actions;

// Default export of the history reducer
export default historyListSlice.reducer;


// Redux slice imports and HistoryItem, HistoryState type definitions remain unchanged

// Slice definition and initial state setup remain unchanged

// Slice actions and reducer definition remain unchanged

/**
 * Documentation for the `historyListSlice` Redux Slice
 *
 * Overview:
 * The `historyListSlice` manages the application's browsing history feature. It is responsible for storing,
 * updating, and clearing a list of history items that the user has interacted with. This slice utilizes Redux Toolkit
 * for efficient state management and leverages localStorage to persist the history across user sessions.
 *
 * State Structure:
 * - historyItems (HistoryItem[]): An array of objects where each object represents a distinct history item.
 *
 * Actions:
 * - addToHistory (HistoryItem): Accepts a history item and either adds it to the state or updates its position
 *   if it already exists, ensuring the most recently interacted item is always at the front.
 * - removeFromHistory (string): Removes a history item based on its imageUrl.
 * - clearHistory (): Clears all history items from the state.
 *
 * Reducers:
 * - The reducers for `addToHistory`, `removeFromHistory`, and `clearHistory` provide the logic for updating
 *   the state in response to dispatched actions. These reducers also synchronize the state with localStorage
 *   to ensure persistence.
 *
 * Usage:
 * Import the actions from the slice and dispatch them in your components to interact with the history state. For example,
 * to add a new item to the history, dispatch the `addToHistory` action with the appropriate payload.
 *
 * Example:
 * ```javascript
 * import { useDispatch } from 'react-redux';
 * import { addToHistory } from './historySlice';
 *
 * function MyComponent() {
 *   const dispatch = useDispatch();
 *   const historyItem = { id: '1', imageUrl: '...', title: 'Example', lastUpdated: '...', url: '...' };
 *
 *   const handleAddToHistory = () => {
 *     dispatch(addToHistory(historyItem));
 *   };
 *
 *   return <button onClick={handleAddToHistory}>Add to History</button>;
 * }
 * ```
 *
 * Integration:
 * To integrate the `historyListSlice` into your application, include it in your Redux store setup. Ensure that
 * your application's store is configured with `configureStore` from Redux Toolkit, and include this slice's reducer
 * in the `reducer` field of the store's configuration.
 *
 * Note:
 * The `historyListSlice` is designed to be flexible and easily integrated into various application structures. It
 * can be extended or modified to suit more complex requirements, such as handling different types of history items or
 * integrating with backend services for cross-device history synchronization.
 *
 * It is important to consider privacy and security implications when storing and managing user history. Ensure that
 * sensitive information is adequately protected and comply with any relevant data protection regulations.
 */

// Export statements remain unchanged
