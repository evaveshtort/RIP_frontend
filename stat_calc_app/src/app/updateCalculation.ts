import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { setStatus } from '../features/dataSlice';


export const updateCalculation = createAsyncThunk<
  any, 
  {calc_id: string, data_for_calc: string}
>(
  'app/updateCalculation', 
  async ({calc_id, data_for_calc}, { dispatch}) => {
    try {
      const response = await api.calculations.calculationsUpdateUpdate(calc_id, {"data_for_calc":data_for_calc});
      dispatch(setStatus(response.status))
    } catch (error: any) {
      dispatch(setStatus(error.status))
    }
  }
);