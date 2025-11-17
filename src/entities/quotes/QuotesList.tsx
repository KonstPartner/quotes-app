import { RefObject } from 'react';

import { QuoteCard } from '@entities/quotes';
import { Quote } from '@features/quotes/model';

const QuotesList = ({
  listRef,
  quotes,
}: {
  listRef: RefObject<HTMLDivElement | null>;
  quotes: Quote[];
}) => {
  return (
    <div
      ref={listRef}
      className="grid scroll-mt-60 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quoteData={quote} />
      ))}
    </div>
  );
};

export default QuotesList;
