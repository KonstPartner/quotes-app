import { QueryClient, queryOptions } from '@tanstack/react-query';

import {
  API_QUOTES_PATH,
  API_RANDOM_QUOTES_PATH,
  getLocalQuoteEndpoint,
  getLocalQuotesEndpointWithQuery,
  getQuotesEndpointWithQuery,
  QUOTES_LIMIT,
} from '@features/quotes/api';
import type {
  CreateQuoteDto,
  LocalQuote,
  LocalQuotesResponse,
  Quote,
  QuotesResponse,
  UpdateQuoteDto,
} from '@features/quotes/model';
import { dummyApi, localApi } from '@constants/api';

export const quotesApi = {
  baseKey: 'quotes',

  getPageQuotesOptions: ({ page }: { page: number }) => {
    const skip = (page - 1) * QUOTES_LIMIT;

    return queryOptions({
      queryKey: [quotesApi.baseKey, 'page', page],
      queryFn: ({ signal }) =>
        dummyApi<QuotesResponse>(
          getQuotesEndpointWithQuery(QUOTES_LIMIT, skip),
          { signal }
        ),
    });
  },

  getRandomQuoteOptions: () =>
    queryOptions({
      queryKey: [quotesApi.baseKey, 'random'],
      queryFn: ({ signal }) =>
        dummyApi<Quote>(API_RANDOM_QUOTES_PATH, { signal }),
    }),
};

export const localQuotesApi = {
  baseKey: 'localQuotes',

  getLocalQuotesPageOptions: (page: number) =>
    queryOptions({
      queryKey: [localQuotesApi.baseKey, 'page', page],
      queryFn: async ({ signal }) =>
        localApi<LocalQuotesResponse>(
          getLocalQuotesEndpointWithQuery(QUOTES_LIMIT, page),
          { signal }
        ),
    }),

  createLocalQuote: (payload: CreateQuoteDto) =>
    localApi<LocalQuote>(API_QUOTES_PATH, {
      method: 'POST',
      json: payload,
    }),

  updateLocalQuote: (payload: UpdateQuoteDto) =>
    localApi<LocalQuote>(`${API_QUOTES_PATH}/${payload.id}`, {
      method: 'PATCH',
      json: {
        quote: payload.quote,
        author: payload.author,
      },
    }),

  getLocalQuoteByIdOptions: (id: LocalQuote['id'], queryClient: QueryClient) =>
    queryOptions({
      queryKey: [localQuotesApi.baseKey, 'byId', id],
      queryFn: ({ signal }) =>
        localApi<LocalQuote>(getLocalQuoteEndpoint(id), { signal }),
      initialData: () => {
        const pages = queryClient.getQueriesData<LocalQuotesResponse>({
          queryKey: [localQuotesApi.baseKey, 'page'],
        });

        for (const [_, pageData] of pages) {
          const found = pageData?.data.find((q) => q.id === id);
          if (found) {
            return found;
          }
        }

        return undefined;
      },
    }),

  deleteLocalQuote: (id: LocalQuote['id']) =>
    localApi<void>(getLocalQuoteEndpoint(id), {
      method: 'DELETE',
    }),
};
