import { QuoteIcon } from 'lucide-react';

import { Quote } from '@features/quotes/model';

const QuoteCard = ({ quoteData }: { quoteData: Quote }) => {
  const { id, author, quote } = quoteData;

  return (
    <article className="border-border/40 bg-card/60 relative flex h-full flex-col justify-between gap-4 rounded-xl border p-4 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <span className="bg-muted/70 inline-flex items-center gap-1 rounded-full px-2 py-0.5">
          <QuoteIcon className="h-3 w-3" aria-hidden="true" />
          <span>Quote #{id}</span>
        </span>
      </div>

      <div className="space-y-3">
        <p className="text-sm leading-relaxed font-medium sm:text-base">
          “{quote}”
        </p>
      </div>

      <footer className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
        <span>— {author}</span>
      </footer>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-10 rounded-t-xl bg-linear-to-b from-white/10 to-transparent dark:from-white/5"
      />
    </article>
  );
};

export default QuoteCard;
