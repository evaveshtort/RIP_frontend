import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalcState {
  draftCalc: boolean,
  draftCalcId: string,
  cntMetrics: number
}

const initialState: CalcState = {
  draftCalc: false,
  draftCalcId: '',
  cntMetrics: 0
};

const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    draftCalcSet(state) {
      state.draftCalc = true;
    },
    
    draftCalcIdSet(state, action: PayloadAction<string>) {
      state.draftCalcId = action.payload;
    },

    cntMetricsSet(state, action: PayloadAction<number>) {
        state.cntMetrics = action.payload;
      },

    resetState(state) {
        state.draftCalcId = '';
        state.draftCalc = false;
        state.cntMetrics = 0;
    }
  },
});

export const { draftCalcSet, draftCalcIdSet, cntMetricsSet, resetState } = calcSlice.actions;

export default calcSlice.reducer;
