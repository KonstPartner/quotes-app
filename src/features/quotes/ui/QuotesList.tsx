import { QuoteCard } from '@entities/quotes';
import { Quote } from '@features/quotes/model/types';

const QuotesList = ({ quotes }: { quotes: Quote[] }) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {quotes.map((item) => (
        <QuoteCard key={item.id} quoteData={item} />
      ))}
    </section>
  );
};

export default QuotesList;
