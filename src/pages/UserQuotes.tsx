import { RedirectSection, WelcomeSection } from '@entities/shared';
import { UserQuotesContainer } from '@features/quotes/ui';
import { Loader } from '@features/shared/ui';

const UserQuotes = () => {
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
        title="Create your own quote"
        description="Add a personal quote and it will appear in your collection."
        button="Add Quote"
        to="/user-quotes/create"
        className="mx-auto sm:w-[90%] md:w-[80%] lg:w-[60%]"
      />

      <Loader>
        <UserQuotesContainer />
      </Loader>
    </div>
  );
};

export default UserQuotes;
