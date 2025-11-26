import { useRouter } from '@tanstack/react-router';

import QuoteForm from '@entities/quotes/QuoteForm';
import { useAuth } from '@features/auth/model';
import { useCreateLocalQuote } from '@features/quotes/api';

const CreateQuoteForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { mutateAsync, isPending, error } = useCreateLocalQuote();

  const handleSubmit = async (values: { quote: string; author: string }) => {
    if (!user) {
      return;
    }

    await mutateAsync({ ...values, userId: user.id });
    router.navigate({ to: '/user-quotes' });
  };

  return (
    <QuoteForm
      title="Add your quote"
      initialQuote=""
      initialAuthor=""
      submitLabel="Save quote"
      isPending={isPending}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateQuoteForm;
