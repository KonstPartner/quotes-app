import { RefObject } from 'react';

import { QuoteCard } from '@entities/quotes';
import { PaginationBar } from '@features/pagination/ui';
import { Quote } from '@features/quotes/model';

type QuotesSectionProps = {
  listRef: RefObject<HTMLDivElement | null>;
  quotes: Quote[];
  metadata: { currentPage: number; totalPages: number };
  handleScroll: (page: number) => void;
  isLocal?: boolean;
};

const QuotesSection = ({
  listRef,
  quotes,
  metadata,
  handleScroll,
  isLocal = false,
}: QuotesSectionProps) => {
  return (
    <section>
      {!quotes.length ? (
        <p className="text-center">No quotes found.</p>
      ) : (
        <div
          ref={listRef}
          className="grid scroll-mt-60 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quoteData={quote} isLocal={isLocal} />
          ))}
        </div>
      )}
      <PaginationBar metadata={metadata} onPageChange={handleScroll} />
    </section>
  );
};

export default QuotesSection;
