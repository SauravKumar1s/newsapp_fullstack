import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../features/products/productsSlice'
import wishSlice from '../constants/wishlist/wishSlice'
import historySlice from '../constants/historylist/historySlice'


export const store = configureStore({
  reducer: {
    products : productsSlice,
    wishlists: wishSlice ,
    historylists : historySlice
  },
})