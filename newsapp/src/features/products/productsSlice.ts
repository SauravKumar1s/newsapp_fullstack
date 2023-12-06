import { createSlice } from '@reduxjs/toolkit'


export interface CounterState {
    value: number
  }
  
  const initialState: CounterState = {
    value: 0,
  }

export const counterSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      
    },
  })

  export default counterSlice.reducer;