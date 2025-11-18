import { RefObject } from 'react';

import { QuoteCard } from '@entities/quotes';
import { Quote } from '@features/quotes/model';

const QuotesList = ({
  listRef,
  quotes,
  isLocal = false,
}: {
  listRef: RefObject<HTMLDivElement | null>;
  quotes: Quote[];
  isLocal?: boolean;
}) => {
  if (!quotes.length) {
    return <p className="text-center">No quotes found.</p>;
  }

  return (
    <div
      ref={listRef}
      className="grid scroll-mt-60 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quoteData={quote} isLocal={isLocal} />
      ))}
    </div>
  );
};

export default QuotesList;
