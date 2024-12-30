import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCalculationById } from "../app/getCalculationById";

interface DataState {
  data: any[];
  status: number | null; 
  all_calc_data: any[];
  all_calc_status: number | null;
}

const initialState: DataState = {
  data: [],
  status: null, 
  all_calc_data: [],
  all_calc_status: null
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    setAllCalcData: (state, action: PayloadAction<any[]>) => {
        state.all_calc_data = action.payload;
      },
    resetState(state) {
        state.data = [];
        state.status = null;
        state.all_calc_data = [];
        state.all_calc_status = null;
    },
    setStatus: (state, action: PayloadAction<number>) => {
        state.status = action.payload
    },
    setAllCalcStatus: (state, action: PayloadAction<number>) => {
        state.all_calc_status = action.payload
    }
  },
});

export const { setData, resetState, setStatus, setAllCalcData, setAllCalcStatus } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;

