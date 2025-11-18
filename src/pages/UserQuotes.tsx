import { WelcomeSection } from '@entities/quotes';
import { UserQuotesContainer } from '@features/quotes/ui';
import { Loader } from '@features/shared';

const UserQuotes = () => {
  return (
    <div className="container space-y-10">
      <WelcomeSection />

      <Loader>
        <UserQuotesContainer />
      </Loader>
    </div>
  );
};

export default UserQuotes;
