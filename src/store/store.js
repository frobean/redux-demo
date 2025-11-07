import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import filtersReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
  },
});
