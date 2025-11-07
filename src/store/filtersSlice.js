import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'all', // 'all' | 'active' | 'completed'
  category: 'all',
  searchText: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    resetFilters: (state) => {
      state.status = 'all';
      state.category = 'all';
      state.searchText = '';
    },
  },
});

export const {
  setStatusFilter,
  setCategoryFilter,
  setSearchText,
  resetFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;
