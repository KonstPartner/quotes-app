import { useSuspenseQuery } from '@tanstack/react-query';

import type { Quote } from '@features/quotes/model';
import { QUOTES_LIMIT } from '@constants/api';

import { quotesApi } from './quotesApi';

export const useSuspenseQuotesPage = (
  page: number
): {
  quotes: Quote[];
  totalPages: number;
} => {
  const { data } = useSuspenseQuery(quotesApi.getPageQuotesOptions({ page }));
  const totalPages = Math.ceil(data.total / QUOTES_LIMIT);

  return {
    quotes: data.quotes,
    totalPages,
  };
};
