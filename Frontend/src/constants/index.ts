import { AxiosRequestConfig } from 'axios';

const BASE_URL = "http://localhost:5003";

export const SERVER_BASE_URL: AxiosRequestConfig = {
    baseURL: `${BASE_URL}/v1/client`,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
};


