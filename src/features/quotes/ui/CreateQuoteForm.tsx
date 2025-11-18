import { useRouter } from '@tanstack/react-router';

import QuoteForm from '@entities/quotes/QuoteForm';

import { useCreateLocalQuote } from '../api';

const CreateQuoteForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending, error } = useCreateLocalQuote();

  const handleSubmit = async (values: { quote: string; author: string }) => {
    await mutateAsync(values);
    router.navigate({ to: '/user-quotes' });
  };

  return (
    <QuoteForm
      title="Add your quote"
      initialQuote=""
      initialAuthor=""
      submitLabel="Save quote"
      isPending={isPending}
      error={error as Error | null}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateQuoteForm;
