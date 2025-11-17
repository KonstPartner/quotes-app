import { useState } from 'react';

import { QuotesList } from '@entities/quotes';
import { useSuspenseQuotesPage } from '@features/quotes/api';
import { PaginationBar } from '@features/shared/pagination/ui';
import useScrollIntoView from '@hooks/useScrollIntoView';

const QuotesSection = () => {
  const [page, setPage] = useState(1);
  const { ref: listRef, handleScroll } = useScrollIntoView<[number]>(
    (nextPage) => setPage(nextPage)
  );
  const { quotes, totalPages } = useSuspenseQuotesPage(page);

  return (
    <section>
      <QuotesList listRef={listRef} quotes={quotes} />
      <PaginationBar
        metadata={{ currentPage: page, totalPages }}
        onPageChange={handleScroll}
      />
    </section>
  );
};

export default QuotesSection;
