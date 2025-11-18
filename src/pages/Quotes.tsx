import { WelcomeSection } from '@entities/quotes';
import { QuotesContainer } from '@features/quotes/ui';
import { Loader } from '@features/shared';

const Quotes = () => {
  return (
    <div className="container space-y-10">
      <WelcomeSection />

      <Loader>
        <QuotesContainer />
      </Loader>
    </div>
  );
};

export default Quotes;
