import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { CreateQuoteDto } from '../model';

import { QUOTES_LIMIT } from './constants';
import { localQuotesApi, quotesApi } from './quotesApi';

export const useSuspenseQuotesPage = (page: number) => {
  const { data, refetch } = useSuspenseQuery(
    quotesApi.getPageQuotesOptions({ page })
  );
  const totalPages = Math.ceil(data.total / QUOTES_LIMIT);

  return {
    quotes: data.quotes,
    totalPages,
    refetch,
  };
};

export const useSuspenseLocalQuotes = (page: number) => {
  const { data, refetch } = useSuspenseQuery(
    localQuotesApi.getLocalQuotesPageOptions(page)
  );
  const totalPages = Math.ceil(data.total / QUOTES_LIMIT);

  return {
    quotes: data.data,
    totalPages,
    refetch,
  };
};

export const useCreateLocalQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateQuoteDto) =>
      localQuotesApi.createLocalQuote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [localQuotesApi.baseKey],
      });
    },
  });
};
