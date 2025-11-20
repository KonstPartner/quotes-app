import { WelcomeSection } from '@entities/quotes';
import { RedirectSection } from '@entities/shared';
import { QuotesContainer } from '@features/quotes/ui';
import { Loader } from '@features/shared';

const Quotes = () => {
  return (
    <div className="container space-y-10">
      <WelcomeSection />

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
