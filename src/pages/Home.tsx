import { RandomQuote } from '@entities/quotes';
import { RedirectSection } from '@entities/shared';

const Home = () => {
  return (
    <div className="container space-y-10 sm:w-[90%] md:w-[80%] lg:w-[60%]">
      <section className="space-y-3 text-center">
        <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
          Welcome
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Discover quotes that match your mood
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Get a random quote of the day, or explore a curated collection of
          quotes from writers, thinkers and leaders.
        </p>
      </section>

      <RandomQuote />

      <RedirectSection
        title="Explore more quotes"
        description="Browse all quotes, filter by authors and find even more inspiration."
        button="Go to quotes"
        to="/quotes"
      />
    </div>
  );
};

export default Home;
