import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MetricsFilterState {
  searchQuery: string;
  shouldFilter: boolean;
}

const initialState: MetricsFilterState = {
  searchQuery: '',
  shouldFilter: false,
};

const metricsFilterSlice = createSlice({
  name: 'metricsFilter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    triggerFilter: (state) => {
      state.shouldFilter = true;
    },
    resetFilter: (state) => {
      state.shouldFilter = false;
    },
    resetSearchQuery: (state) => {
      state.searchQuery = '';
    },
    resetState: () => initialState
  },
});

export const { setSearchQuery, triggerFilter, resetFilter, resetSearchQuery, resetState } = metricsFilterSlice.actions;
export default metricsFilterSlice.reducer;



