import { configureStore } from '@reduxjs/toolkit';
import {pikachuReducer, boardReducer} from './slice';

export default configureStore({
  reducer: {
    pikachu:pikachuReducer,
    board: boardReducer,
  },
})