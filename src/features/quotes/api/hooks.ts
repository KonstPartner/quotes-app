import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { useAuth } from '@features/auth/model';
import { localQuotesApi, QUOTES_LIMIT, quotesApi } from '@features/quotes/api';
import {
  CreateQuoteDto,
  LocalQuote,
  LocalQuotesResponse,
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

export const useRandomQuote = () => {
  return useQuery(quotesApi.getRandomQuoteOptions());
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
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payload: UpdateQuoteDto) => {
      if (!user) {
        throw new Error('You must be logged in to update a quote');
      }

      if (user.id !== payload.userId) {
        throw new Error(
          "Permission denied. You can't update quote you don't own"
        );
      }

      return localQuotesApi.updateLocalQuote(payload);
    },
    onSuccess: (updatedQuote: LocalQuote) => {
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

export const useDeleteLocalQuote = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (payload: {
      id: LocalQuote['id'];
      userId: LocalQuote['userId'];
    }) => {
      if (!user) {
        throw new Error('You must be logged in to delete a quote');
      }

      if (payload.userId !== user.id) {
        throw new Error('You can only delete your own quotes');
      }

      return localQuotesApi.deleteLocalQuote(payload.id);
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: [localQuotesApi.baseKey],
      });

      queryClient.removeQueries({
        queryKey: [localQuotesApi.baseKey, 'byId', id],
      });
    },
  });
};
