import { RefreshCw } from 'lucide-react';

import { Button } from '@shadcn';
import { QuoteCard } from '@entities/quotes';
import { useRandomQuote } from '@features/quotes/api';

const RandomQuote = () => {
  const {
    data: quote,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
  } = useRandomQuote();

  return (
    <section className="space-y-4">
      <div className="flex flex-col items-center space-y-1">
        <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
          Your quote of the day
        </p>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          A random thought to inspire you
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex-1">
          {isPending && (
            <div className="text-muted-foreground text-sm">
              Loading a quote…
            </div>
          )}

          {isError && (
            <p className="text-destructive text-sm">
              Failed to load quote: {error?.message ?? 'Unknown error'}
            </p>
          )}

          {quote && !isPending && !isError && <QuoteCard quoteData={quote} />}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => refetch()}
          disabled={isRefetching || isPending}
          className="inline-flex cursor-pointer items-center gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          {isRefetching || isPending ? 'Finding quote…' : 'Find another'}
        </Button>
      </div>
    </section>
  );
};

export default RandomQuote;
