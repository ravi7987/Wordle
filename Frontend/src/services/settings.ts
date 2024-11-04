import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosPromise } from 'axios';
import { api } from './index';
import { IResponse, payload } from '../types/common';

//////////////////////////////////////////////////////////////////////////////////////////////////////
/* Request Settings API and thunk */

const getSettingsApi = (): AxiosPromise<IResponse<any>> => {
    console.log("from here")
  return api.get(`/settings`);
};

export const getSettings = createAsyncThunk<any, any>('/settings', async ({ rejectWithValue }) => {
  try {
    const response = await getSettingsApi();
    if (response.data.errorMsg && response.data.success) {
      return rejectWithValue(response.data.errorMsg);
    } else {
      return response;
    }
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
/* End */

//////////////////////////////////////////////////////////////////////////////////////////////////////
/* Update candidates API and thunk */

export const updateCandidatesApi = (data: any): AxiosPromise<IResponse<any>> => {
    const query = `?id=${data.id}`;
    return api.patch(`/settings-candidates`+query, data);
};


/* End */

//////////////////////////////////////////////////////////////////////////////////////////////////////
/* Update candidates API and thunk */

export const updateNumberOfAttemptsApi = (data: any): AxiosPromise<IResponse<any>> => {
    const query = `?id=${data.id}`;
    return api.patch(`/settings-attempts`+query, data);
};

/* End */