import { EditQuoteForm } from '@features/quotes/ui';

const EditQuote = () => {
  return (
    <div className="container space-y-8 py-8">
      <section className="space-y-2 text-center">
        <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
          Edit quote
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Update your local quote
        </h1>
      </section>

      <EditQuoteForm />
    </div>
  );
};

export default EditQuote;
