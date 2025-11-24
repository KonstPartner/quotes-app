import { RefObject } from 'react';

import { QuotesList } from '@entities/quotes';
import { PaginationBar } from '@features/pagination/ui';
import { Quote } from '@features/quotes/model';

const QuotesSection = ({
  listRef,
  quotes,
  metadata,
  handleScroll,
  isLocal = false,
}: {
  listRef: RefObject<HTMLDivElement | null>;
  quotes: Quote[];
  metadata: { currentPage: number; totalPages: number };
  handleScroll: (page: number) => void;
  isLocal?: boolean;
}) => {
  return (
    <section>
      <QuotesList listRef={listRef} quotes={quotes} isLocal={isLocal} />
      <PaginationBar metadata={metadata} onPageChange={handleScroll} />
    </section>
  );
};

export default QuotesSection;
