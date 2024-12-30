import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { setData, setStatus } from '../features/dataSlice';


export const getCalculationById = createAsyncThunk<
  any, 
  string
>(
  'app/getCalculationById', 
  async (calc_id, { dispatch}) => {
    try {
      const response = await api.calculations.calculationsRead(calc_id);

      if (response.status === 200) {
        dispatch(setData([response.data]));
      }
      dispatch(setStatus(response.status))
    } catch (error: any) {
      dispatch(setStatus(error.status))
    }
  }
);




