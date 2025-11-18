import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { localQuotesApi, QUOTES_LIMIT, quotesApi } from '@features/quotes/api';
import {
  CreateQuoteDto,
  LocalQuotesResponse,
  Quote,
  UpdateQuoteDto,
} from '@features/quotes/model';

export const useSuspenseQuotes = (page: number) => {
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

export const useUpdateLocalQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateQuoteDto) =>
      localQuotesApi.updateLocalQuote(payload),
    onSuccess: (updatedQuote: Quote) => {
      queryClient.setQueryData(
        [localQuotesApi.baseKey, 'byId', updatedQuote.id],
        updatedQuote
      );

      const pages = queryClient.getQueriesData<LocalQuotesResponse>({
        queryKey: [localQuotesApi.baseKey, 'page'],
      });

      for (const [queryKey, pageData] of pages) {
        if (!pageData) {
          continue;
        }

        const newQuotes = pageData.data.map((q) =>
          q.id === updatedQuote.id ? updatedQuote : q
        );

        queryClient.setQueryData(queryKey, {
          ...pageData,
          data: newQuotes,
        });
      }
    },
  });
};

export const useLocalQuoteById = (id: number) => {
  const queryClient = useQueryClient();

  return useSuspenseQuery(
    localQuotesApi.getLocalQuoteByIdOptions(id, queryClient)
  );
};
