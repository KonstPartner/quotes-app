export const API_QUOTES_PATH = '/quotes';

export const getQuotesEndpointWithQuery = (limit: number, skip: number) =>
  API_QUOTES_PATH + `?limit=${limit}&skip=${skip}`;

export const QUOTES_LIMIT = 12;
