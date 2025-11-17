import { queryOptions } from '@tanstack/react-query';

import type {
  LocalQuotesResponse,
  QuotesResponse,
} from '@features/quotes/model';
import { dummyApi, localApi } from '@constants/api';

import {
  getLocalQuotesEndpointWithQuery,
  getQuotesEndpointWithQuery,
  QUOTES_LIMIT,
} from './constants';

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
};
