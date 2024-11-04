import axios from 'axios';
import { SERVER_BASE_URL } from '../constants/index';
import { setupInterceptorsTo } from './interceptorFunctions';

/* axois configuration along with inclusion of the interceptor */
export const api = axios.create(SERVER_BASE_URL);
setupInterceptorsTo(api);

export default api;
