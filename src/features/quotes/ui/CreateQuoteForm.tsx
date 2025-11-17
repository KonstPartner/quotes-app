import { Button, Input, Textarea } from '@shadcn';
import useCreateQuoteForm from '@features/quotes/model/useCreateQuoteForm';

const UserQuoteCreateForm = () => {
  const {
    quote,
    setQuote,
    author,
    setAuthor,
    handleSubmit,
    isPending,
    error,
    isDisabled,
  } = useCreateQuoteForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card mx-auto flex w-full max-w-md flex-col gap-4 rounded-xl border p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold tracking-tight">Add your quote</h2>

      {error && (
        <p className="text-destructive text-sm" role="alert">
          Failed to save quote. Please try again.
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
          value={quote}
          onChange={(event) => setQuote(event.target.value)}
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
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Who said this?"
          className="text-sm"
          required
        />
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <Button type="submit" size="sm" disabled={isDisabled}>
          {isPending ? 'Saving…' : 'Save quote'}
        </Button>
      </div>
    </form>
  );
};

export default UserQuoteCreateForm;
