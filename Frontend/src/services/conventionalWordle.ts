import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosPromise } from 'axios';
import { api } from './index';
import { IResponse } from '../types/common';

//////////////////////////////////////////////////////////////////////////////////////////////////////
/* Process Input API and thunk */

const processInputApi = (data: {id: string, word: string, index: number, rowIndex: number}): AxiosPromise<IResponse<any>> => {
    const query = `?id=${data.id}`;
    return api.post(`/process-input`+query, { word: data.word, index: data.index, rowIndex: data.rowIndex });
};

export const processInput = createAsyncThunk<any, any>('/process-input', async ( data: {id: string, word: string, index: number, rowIndex: number}, { rejectWithValue }) => {
  try {
    const response = await processInputApi(data);
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
