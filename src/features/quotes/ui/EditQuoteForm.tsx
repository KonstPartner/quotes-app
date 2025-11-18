import { useParams, useRouter } from '@tanstack/react-router';

import { QuoteForm } from '@entities/quotes';
import { useLocalQuoteById, useUpdateLocalQuote } from '@features/quotes/api';

const EditQuoteForm = () => {
  const router = useRouter();
  const { id } = useParams({ from: '/user-quotes/$id/edit' });
  const quoteId = Number(id);
  const { data: quote } = useLocalQuoteById(quoteId);
  const { mutateAsync, isPending, error } = useUpdateLocalQuote();

  const handleSubmit = async (values: { quote: string; author: string }) => {
    await mutateAsync({
      id: quoteId,
      quote: values.quote,
      author: values.author,
    });

    router.navigate({ to: '/user-quotes' });
  };

  return (
    <QuoteForm
      title="Edit quote"
      initialQuote={quote.quote}
      initialAuthor={quote.author}
      submitLabel="Update quote"
      isPending={isPending}
      error={error as Error | null}
      onSubmit={handleSubmit}
    />
  );
};

export default EditQuoteForm;
