import { WelcomeSection } from '@entities/quotes';
import { UserQuotesSection } from '@features/quotes/ui';
import { Loader } from '@features/shared';

const UserQuotes = () => {
  return (
    <div className="container space-y-10">
      <WelcomeSection />

      <Loader>
        <UserQuotesSection />
      </Loader>
    </div>
  );
};

export default UserQuotes;
