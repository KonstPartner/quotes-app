import { apiInstance } from '@utils';

export const API_BASE_URL = 'https://dummyjson.com';
export const LOCAL_API_BASE_URL = 'http://localhost:3000';
export const WEBSOCKET_URL = 'wss://ws.ifelse.io';

export const dummyApi = apiInstance(API_BASE_URL);
export const localApi = apiInstance(LOCAL_API_BASE_URL);
