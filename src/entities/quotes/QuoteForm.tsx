import type { FormEvent } from 'react';

import { Textarea } from '@shadcn';
import { Input } from '@shadcn';
import { Button } from '@shadcn';

const QuoteForm = ({
  title,
  initialQuote,
  initialAuthor,
  submitLabel,
  isPending,
  error,
  onSubmit,
}: {
  title: string;
  initialQuote: string;
  initialAuthor: string;
  submitLabel: string;
  isPending: boolean;
  error: Error | null;
  onSubmit: (values: { quote: string; author: string }) => Promise<void>;
}) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const quote = String(formData.get('quote') ?? '').trim();
    const author = String(formData.get('author') ?? '').trim();

    if (!quote || !author) {
      return;
    }

    await onSubmit({ quote, author });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card mx-auto flex w-full max-w-md flex-col gap-4 rounded-xl border p-6 shadow-sm"
    >
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>

      {error && (
        <p className="text-destructive text-sm" role="alert">
          {error.message}
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label
          htmlFor="quote"
          className="text-foreground/80 text-sm font-medium"
        >
          Quote
        </label>
        <Textarea
          id="quote"
          name="quote"
          defaultValue={initialQuote}
          rows={4}
          placeholder="Write something inspiring..."
          className="text-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="author"
          className="text-foreground/80 text-sm font-medium"
        >
          Author
        </label>
        <Input
          id="author"
          name="author"
          type="text"
          defaultValue={initialAuthor}
          placeholder="Who said this?"
          className="text-sm"
          required
        />
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <Button role="button" type="submit" size="sm" disabled={isPending}>
          {isPending ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default QuoteForm;
