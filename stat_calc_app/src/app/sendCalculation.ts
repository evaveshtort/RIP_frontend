import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { setStatus } from '../features/dataSlice';
import { resetState as resetCalcState } from '../features/calcSlice';


export const sendCalculation = createAsyncThunk<
  any, 
  string
>(
  'app/sendCalculation', 
  async (calc_id, { dispatch}) => {
    try {
      const response = await api.calculations.calculationsUpdateStatusUserUpdate(calc_id);
      dispatch(setStatus(response.status))
      if (response.status == 200 ) {
            dispatch(resetCalcState())
        }
    } catch (error: any) {
      dispatch(setStatus(error.status))
    }
  }
);