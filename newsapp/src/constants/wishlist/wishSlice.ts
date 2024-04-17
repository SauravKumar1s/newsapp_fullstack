import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Defines the structure for a single wishlist item
interface WishlistItem {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  lastUpdated: string;
  url: string;
  source?: string;
}

// Defines the state structure for the wishlist feature
interface WishlistsState {
  wishlistsItems: WishlistItem[];
}

// Initial state, loads existing wishlist items from localStorage or starts with an empty array
const initialState: WishlistsState = {
  wishlistsItems: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems")!)
    : [],
};

// The wishlists slice contains actions and reducers to manage wishlist items within the application
export const wishlistsSlice = createSlice({
  name: "wishlists",
  initialState,
  reducers: {
    // Adds an item to the wishlist, ensuring no duplicates based on imageUrl
    addToWishList: (state, action: PayloadAction<WishlistItem>) => {
      const existingItem = state.wishlistsItems.find(
        (item) => item.imageUrl === action.payload.imageUrl
      );

      if (existingItem) {
        alert("This item is already in your wishlist!");
      } else {
        state.wishlistsItems.push(action.payload);
        // Persist changes to localStorage
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistsItems));
      }
    },

    // Removes an item from the wishlist by imageUrl
    removeWishlist: (state, action: PayloadAction<WishlistItem>) => {
      state.wishlistsItems = state.wishlistsItems.filter(
        (item) => item.imageUrl !== action.payload.imageUrl
      );
      // Persist changes to localStorage
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistsItems));
    },

    // Clears all items from the wishlist
    clearWishlists: (state) => {
      state.wishlistsItems = [];
      // Clear the wishlist in localStorage
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistsItems));
    },
  },
});

// Exporting the actions for use in UI components
export const { addToWishList, removeWishlist, clearWishlists } = wishlistsSlice.actions;

// Exporting the reducer as the default export
export default wishlistsSlice.reducer;

/**
 * Documentation for the `wishlistsSlice` Redux Slice
 *
 * Overview:
 * `wishlistsSlice` is responsible for managing a wishlist feature within the application, including adding new items, removing items, and clearing the wishlist. It leverages Redux Toolkit for efficient state management and localStorage for persistence.
 *
 * State Structure:
 * - `wishlistsItems`: Array of `WishlistItem` objects representing the items a user has added to their wishlist.
 *
 * Actions:
 * - `addToWishList`: Adds a new item to the wishlist. If the item already exists (based on `imageUrl`), it alerts the user instead of adding it.
 * - `removeWishlist`: Removes an item from the wishlist based on its `imageUrl`.
 * - `clearWishlists`: Clears all items from the wishlist.
 *
 * Reducers:
 * - Modify the `wishlistsItems` array in response to actions dispatched. Updates are persisted to localStorage to maintain state across sessions.
 *
 * Usage:
 * Import the actions from this slice to add, remove, or clear wishlist items in your components. Ensure to wrap your app with a Redux provider and configure the store to include this slice's reducer.
 *
 * Example:
 * ```javascript
 * import { useDispatch } from 'react-redux';
 * import { addToWishList, removeWishlist } from './wishlistsSlice';
 *
 * function WishlistComponent() {
 *   const dispatch = useDispatch();
 *
 *   const handleAddItem = (item) => {
 *     dispatch(addToWishList(item));
 *   };
 *
 *   // Example item structure: { id: '1', imageUrl: 'http://example.com/item.jpg', title: 'Example Item', lastUpdated: '2021-01-01', url: 'http://example.com', source: 'Example Source' }
 * }
 * ```
 *
 * Integration:
 * Include this slice in your Redux store setup and use the provided actions to interact with the wishlist from your components. This slice abstracts away direct interactions with localStorage, offering a clean interface for managing wishlist state within React components.
 *
 * Note:
 * This slice's functionality is focused on client-side state management. Consider extending or modifying it to integrate with a backend service for user-specific wishlists in a multi-user or authenticated context.
 */

