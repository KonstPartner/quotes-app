import { QuotesSection } from '@features/quotes/ui';
import { Loader } from '@features/shared';

const QuotesPage = () => {
  return (
    <div className="container space-y-10">
      <section className="space-y-2 text-center">
        <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
          Daily inspiration
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Thoughtful quotes for your day
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
          Explore a curated collection of quotes from writers, thinkers and
          leaders.
        </p>
      </section>

      <Loader>
        <QuotesSection />
      </Loader>
    </div>
  );
};

export default QuotesPage;
