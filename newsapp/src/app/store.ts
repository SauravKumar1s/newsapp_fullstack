import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../features/products/productsSlice'
import wishSlice from '../features/wishlist/wishSlice'


export const store = configureStore({
  reducer: {
    products : productsSlice,
    wishlists: wishSlice
  },
})