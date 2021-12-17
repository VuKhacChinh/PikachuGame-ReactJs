import { createSlice } from '@reduxjs/toolkit';
import { startGame, createBoard } from '../Game/Controller';

export const pikachuSlice = createSlice({
  name: 'pikachu',
  initialState: {
    value: startGame(),
  },
  reducers: {
    changePikachu: (state, action) => {
     state.value = action.payload
    },
  },
})

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    value: createBoard(),
  },
  reducers: {
    changeBoard: (state, action) => {
     state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changePikachu } = pikachuSlice.actions;
export const pikachuReducer  = pikachuSlice.reducer;
export const { changeBoard } = boardSlice.actions;
export const boardReducer  = boardSlice.reducer;
