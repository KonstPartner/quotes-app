import { ArrowBigDownDash } from 'lucide-react';

import { RedirectSection, WelcomeSection } from '@entities/shared';
import { RandomQuote } from '@features/quotes/ui';

const Home = () => {
  return (
    <div className="container flex flex-col items-center space-y-[10%] py-[10%] sm:w-[90%] md:w-[80%] lg:w-[60%]">
      <WelcomeSection
        subtitle="Welcome"
        title="Discover quotes that match your mood"
        description="Get a random quote of the day, or explore a curated collection of quotes from writers, thinkers and leaders."
      />

      <ArrowBigDownDash className="h-50 w-50" />

      <RandomQuote />

      <ArrowBigDownDash className="h-50 w-50" />

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
