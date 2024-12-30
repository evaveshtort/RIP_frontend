import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { setAllCalcData, setAllCalcStatus } from '../features/dataSlice';


export const getCalculations = createAsyncThunk<
  any,
  {status: string, dateStart: string, dateEnd: string}
>(
  'app/getCalculations', 
  async ({status, dateStart, dateEnd}, { dispatch }) => {
    try {
      const response = await api.calculations.calculationsList({status: status, dateStart: dateStart, dateEnd:dateEnd});

      if (response.status === 200) {
        dispatch(setAllCalcData([response.data]));
      }
      dispatch(setAllCalcStatus(response.status))
    } catch (error: any) {
      dispatch(setAllCalcStatus(error.status))
    }
  }
);