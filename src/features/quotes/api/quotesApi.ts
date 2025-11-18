import { QueryClient, queryOptions } from '@tanstack/react-query';

import {
  API_QUOTES_PATH,
  getLocalQuoteEndpoint,
  getLocalQuotesEndpointWithQuery,
  getQuotesEndpointWithQuery,
  QUOTES_LIMIT,
} from '@features/quotes/api';
import type {
  CreateQuoteDto,
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
    localApi<Quote>(API_QUOTES_PATH, {
      method: 'POST',
      json: payload,
    }),

  updateLocalQuote: (payload: UpdateQuoteDto) =>
    localApi<Quote>(`${API_QUOTES_PATH}/${payload.id}`, {
      method: 'PATCH',
      json: {
        quote: payload.quote,
        author: payload.author,
      },
    }),

  getLocalQuoteByIdOptions: (id: Quote['id'], queryClient: QueryClient) =>
    queryOptions({
      queryKey: [localQuotesApi.baseKey, 'byId', id],
      queryFn: ({ signal }) =>
        localApi<Quote>(getLocalQuoteEndpoint(id), { signal }),
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
};
