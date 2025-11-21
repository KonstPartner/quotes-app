import { WelcomeSection } from '@entities/shared';
import { EditQuoteForm } from '@features/quotes/ui';

const EditQuote = () => {
  return (
    <div className="container space-y-8">
      <WelcomeSection
        subtitle="Edit quote"
        title="Update your local quote"
        description=""
        className="mx-auto sm:w-[90%] md:w-[80%] lg:w-[60%]"
      />

      <EditQuoteForm />
    </div>
  );
};

export default EditQuote;
