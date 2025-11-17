import { FormEvent, useState } from 'react';
import { useRouter } from '@tanstack/react-router';

import { useCreateLocalQuote } from '../api';

import { CreateQuoteDto } from './types';

const useCreateQuoteForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending, error } = useCreateLocalQuote();

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const isDisabled = !quote.trim() || !author.trim() || isPending;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuote = quote.trim();
    const trimmedAuthor = author.trim();

    if (!trimmedQuote || !trimmedAuthor) {
      return;
    }

    const payload: CreateQuoteDto = {
      quote: trimmedQuote,
      author: trimmedAuthor,
    };

    await mutateAsync(payload);

    router.navigate({ to: '/user-quotes' });
  };

  return {
    quote,
    setQuote,
    author,
    setAuthor,
    handleSubmit,
    isPending,
    error,
    isDisabled,
  };
};

export default useCreateQuoteForm;
