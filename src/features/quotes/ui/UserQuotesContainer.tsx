import { useState } from 'react';

import { QuotesSection } from '@entities/quotes';
import { useSuspenseLocalQuotes } from '@features/quotes/api';
import useScrollIntoView from '@hooks/useScrollIntoView';

const UserQuotesContainer = () => {
  const [page, setPage] = useState(1);
  const { ref: listRef, handleScroll } = useScrollIntoView<[number]>(
    (nextPage) => setPage(nextPage)
  );
  const { quotes, totalPages } = useSuspenseLocalQuotes(page);

  return (
    <QuotesSection
      listRef={listRef}
      quotes={quotes}
      metadata={{ currentPage: page, totalPages }}
      handleScroll={handleScroll}
    />
  );
};

export default UserQuotesContainer;
