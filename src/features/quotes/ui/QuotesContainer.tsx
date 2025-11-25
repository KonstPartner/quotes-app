import { useEffect, useState } from 'react';

import { QuotesSection } from '@entities/quotes';
import { useSuspenseQuotes } from '@features/quotes/api';
import { useScrollIntoView } from '@hooks';

const QuotesContainer = () => {
  const [page, setPage] = useState(1);
  const { ref: listRef, handleScroll } = useScrollIntoView<[number]>(
    (nextPage) => setPage(nextPage)
  );
  const { quotes, totalPages } = useSuspenseQuotes(page);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <QuotesSection
      listRef={listRef}
      quotes={quotes}
      metadata={{ currentPage: page, totalPages }}
      handleScroll={handleScroll}
    />
  );
};

export default QuotesContainer;
