import { useState } from 'react';

import { QuoteCard } from '@entities/quotes';
import { useSuspenseQuotesPage } from '@features/quotes/api';
import { PaginationBar } from '@features/shared/pagination/ui';
import { useScrollIntoView } from '@hooks';

const QuotesList = () => {
  // TODO: try to extract logic upper
  const [page, setPage] = useState(1);
  const { ref: listRef, handleScroll } = useScrollIntoView<[number]>(
    (nextPage) => setPage(nextPage)
  );
  const { quotes, totalPages } = useSuspenseQuotesPage(page);

  return (
    <section className="container">
      <div
        ref={listRef}
        className="grid scroll-mt-60 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quoteData={quote} />
        ))}
      </div>

      <PaginationBar
        metadata={{ currentPage: page, totalPages }}
        onPageChange={handleScroll}
      />
    </section>
  );
};

export default QuotesList;
