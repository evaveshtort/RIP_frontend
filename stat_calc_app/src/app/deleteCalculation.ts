import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { setStatus } from '../features/dataSlice';
import { resetState as resetCalcState } from '../features/calcSlice';


export const deleteCalculation = createAsyncThunk<
  any, 
  string
>(
  'app/deleteCalculation', 
  async (calc_id, { dispatch}) => {
    try {
      const response = await api.calculations.calculationsDeleteDelete(calc_id);
      if (response.status == 200 ) {
        dispatch(resetCalcState())
      }
      dispatch(setStatus(response.status))
    } catch (error: any) {
      dispatch(setStatus(error.status))
    }
  }
);