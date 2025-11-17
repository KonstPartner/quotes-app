import { queryOptions } from '@tanstack/react-query';

import type { QuotesResponse } from '@features/quotes/model';
import { jsonApiInstance } from '@utils';

import { getQuotesEndpointWithQuery, QUOTES_LIMIT } from './constants';

export const quotesApi = {
  baseKey: 'quotes',

  getPageQuotesOptions: ({ page }: { page: number }) => {
    const skip = (page - 1) * QUOTES_LIMIT;

    return queryOptions({
      queryKey: [quotesApi.baseKey, 'page', page],
      queryFn: ({ signal }) =>
        jsonApiInstance<QuotesResponse>(
          getQuotesEndpointWithQuery(QUOTES_LIMIT, skip),
          { signal }
        ),
    });
  },
};
