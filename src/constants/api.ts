export const API_BASE_URL = 'https://dummyjson.com';

export const API_QUOTES_PATH = '/quotes';

export const getQuotesEndpointWithQuery = (limit: number, skip: number) =>
  API_QUOTES_PATH + `?limit=${limit}&skip=${skip}`;

export const QUOTES_LIMIT = 12;
