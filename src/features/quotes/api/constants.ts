import { LocalQuote } from '@features/quotes/model';

export const API_QUOTES_PATH = '/quotes';

export const API_RANDOM_QUOTES_PATH = '/quotes/random';

export const QUOTES_LIMIT = 12;

export const getQuotesEndpointWithQuery = (limit: number, skip: number) =>
  API_QUOTES_PATH + `?limit=${limit}&skip=${skip}`;

export const getLocalQuotesEndpointWithQuery = (limit: number, page: number) =>
  API_QUOTES_PATH + `?_limit=${limit}&_page=${page}`;

export const getLocalQuoteEndpoint = (id: LocalQuote['id']) =>
  API_QUOTES_PATH + '/' + id;
