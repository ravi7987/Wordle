import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosPromise } from 'axios';
import { api } from './index';
import { IResponse } from '../types/common';

//////////////////////////////////////////////////////////////////////////////////////////////////////
/* Process Input API and thunk */

const processAdvancedInputApi = (data: {
    id: string;
    word: string[];
    rowIndex: number;
}): AxiosPromise<IResponse<any>> => {
    const query = `?id=${data.id}`;
    return api.post(`/process-advanced-input` + query, {
        word: data.word,
        rowIndex: data.rowIndex,
    });
};

export const processAdvancedInput = createAsyncThunk<any, any>(
    '/process-advanced-input',
    async (data: { id: string; word: string[]; rowIndex: number }, { rejectWithValue }) => {
        try {
            const response = await processAdvancedInputApi(data);
            if (response.data.errorMsg && response.data.success) {
                return rejectWithValue(response.data.errorMsg);
            } else {
                return response;
            }
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    },
);
/* End */
