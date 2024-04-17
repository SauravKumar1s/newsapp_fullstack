// Importing the configureStore utility from Redux Toolkit to simplify store setup.
import { configureStore } from '@reduxjs/toolkit';
// Importing slice reducers from their respective feature and constants directories.
import productsSlice from '../features/products/productsSlice';
import wishSlice from '../constants/wishlist/wishSlice';
import historySlice from '../constants/historylist/historySlice';

// Configuring the Redux store with the configureStore method.
export const store = configureStore({
  reducer: {
    // Assigning slice reducers to keys in the global state.
    // products: State related to products, managed by productsSlice.
    products: productsSlice,
    // wishlists: Contains wishlist items, managed by wishSlice.
    wishlists: wishSlice,
    // historylists: Tracks history of user actions or items, managed by historySlice.
    historylists: historySlice,
  },
});

/*
Store Configuration Documentation:

This code snippet configures a Redux store using Redux Toolkit's configureStore method, which provides sensible defaults and middleware integration for the store setup.

Dependencies:
- @reduxjs/toolkit: Package that offers tools to simplify Redux development.

Structure:
- The store configuration is typically centralized in a store.js (or store.ts for TypeScript) file.

Explanation:
- The configureStore call sets up the store with multiple reducers corresponding to different features of the application. Each key in the reducer object represents a piece of the state, managed by the respective slice.

Usage:
- Components interact with the store using hooks like useSelector and useDispatch from react-redux.
- Slices define the shape of the state, reducers for handling state changes, and actions to trigger those reducers.

Best Practices:
- Maintain slices cohesively with their state, reducers, and actions for better maintainability.
- Utilize Redux Toolkit's createSlice and createAsyncThunk for simpler state updates and handling asynchronous logic.
*/
