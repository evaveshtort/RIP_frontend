import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setStatus } from '../features/dataSlice';
import { dest_api } from "../target_config"


export const setReset = createAsyncThunk<
  any, 
  {calc_id:number, status: string}
>(
  'app/setReset', 
  async ({calc_id, status}, { dispatch}) => {
    try {
      const response = await axios.put(dest_api + '/calculations/'+calc_id+'/update_status_admin/', 
            {"status":status})
      dispatch(setStatus(response.status))
    } catch (error: any) {
      dispatch(setStatus(error.status))
    }
  }
);