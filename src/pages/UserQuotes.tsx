import { WelcomeSection } from '@entities/quotes';
import { RedirectSection } from '@entities/shared';
import { UserQuotesContainer } from '@features/quotes/ui';
import { Loader } from '@features/shared';

const UserQuotes = () => {
  return (
    <div className="container space-y-10">
      <WelcomeSection />

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
