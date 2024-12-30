import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { setStatus } from '../features/dataSlice';


export const updateCalcMetric = createAsyncThunk<
  any, 
  {calc_id: string, metric_id: string, amount_of_data: number}
>(
  'app/updateCalcMetric', 
  async ({calc_id, metric_id, amount_of_data}, { dispatch}) => {
    try {
      const response = await api.calculations.calculationsUpdateMetricUpdate(calc_id, 
        metric_id, {"amount_of_data":amount_of_data});
        dispatch(setStatus(response.status))
    } catch (error: any) {
      dispatch(setStatus(error.status))
    }
  }
);