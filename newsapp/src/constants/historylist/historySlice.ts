import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryItem {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  lastUpdated: string;
  url: string;
  source?: string;
}

interface HistoryState {
  historyItems: HistoryItem[];
}

const initialState: HistoryState = {
  historyItems: (localStorage.getItem("historyItems")
    ? JSON.parse(localStorage.getItem("historyItems")!)
    : []) as HistoryItem[],
};

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

    removeFromHistory: (state, action: PayloadAction<string>) => {
      const updatedHistory = state.historyItems.filter(
        (item) => item.imageUrl !== action.payload
      );

      state.historyItems = updatedHistory;
      localStorage.setItem("historyItems", JSON.stringify(state.historyItems));
    },

    clearHistory: (state) => {
      state.historyItems = [];
      localStorage.setItem("historyItems", JSON.stringify(state.historyItems));
    },
  },
});

export const { addToHistory, removeFromHistory, clearHistory } = historyListSlice.actions;

export default historyListSlice.reducer;
