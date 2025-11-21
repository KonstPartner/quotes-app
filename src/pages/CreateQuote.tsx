import { RedirectSection, WelcomeSection } from '@entities/shared';
import { useAuth } from '@features/auth/model';
import { CreateQuoteForm } from '@features/quotes/ui';

const CreateQuote = () => {
  const { user } = useAuth();

  return (
    <div className="container space-y-8">
      <WelcomeSection
        subtitle="User quote"
        title=" Share your favorite quote"
        description="Add a quote you like — it will be shown on the user quotes page."
        className="mx-auto sm:w-[90%] md:w-[80%] lg:w-[60%]"
      />

      {!user && (
        <RedirectSection
          title="Sign in"
          description="You have to sign in before creating a quote."
          button="Sign in"
          to="/login"
          className="mx-auto sm:w-[90%] md:w-[80%] lg:w-[60%]"
        />
      )}

      {user && <CreateQuoteForm />}
    </div>
  );
};

export default CreateQuote;
