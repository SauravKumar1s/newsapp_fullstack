import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  lastUpdated: string;
  url: string;
  source?: string;
}

interface WishlistsState {
  wishlistsItems: WishlistItem[];
}

const initialState: WishlistsState = {
  wishlistsItems: (localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems")!)
    : []) as WishlistItem[],
};

export const wishlistsSlice = createSlice({
  name: "wishlists",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<WishlistItem>) => {
      const existingItem = state.wishlistsItems.find(
        (item) => item.imageUrl === action.payload.imageUrl
      );
    
      if (existingItem) {
        alert("You cannot add this to wishlists anymore; it is married!");
      } else {
        const assembledItem = { ...action.payload };
        state.wishlistsItems.push(assembledItem);
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistsItems));
      }
    },
    

    removeWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const updatedWishlists = state.wishlistsItems?.filter(
        (item) => item?.imageUrl !== action.payload?.imageUrl
      );

      state.wishlistsItems = updatedWishlists || [];
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistsItems)
      );
    },

    clearWishlists: (state) => {
      state.wishlistsItems = [];
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistsItems)
      );
    },
  },
});

export const { addToWishList, removeWishlist, clearWishlists } =
  wishlistsSlice.actions;

export default wishlistsSlice.reducer;
