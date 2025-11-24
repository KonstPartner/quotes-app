import { RedirectSection, WelcomeSection } from '@entities/shared';
import { QuotesContainer } from '@features/quotes/ui';
import { Loader } from '@features/shared/ui';

const Quotes = () => {
  return (
    <div className="container">
      <WelcomeSection
        subtitle="Daily inspiration"
        title="Thoughtful quotes for your day"
        description="Explore a curated collection of quotes from writers, thinkers and
        leaders."
        className="mx-auto sm:w-[90%] md:w-[80%] lg:w-[60%]"
      />

      <RedirectSection
        title="User created quotes"
        description="View quotes added by users or contribute your own."
        button="Go to user quotes"
        to="/user-quotes"
        className="mx-auto sm:w-[90%] md:w-[80%] lg:w-[60%]"
      />

      <Loader>
        <QuotesContainer />
      </Loader>
    </div>
  );
};

export default Quotes;
