import { CreateQuoteForm } from '@features/quotes/ui';

const CreateQuote = () => {
  return (
    <div className="container space-y-8 py-8">
      <section className="space-y-2 text-center">
        <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
          User quote
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Share your favorite quote
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
          Add a quote you like — it will be shown on the user quotes page.
        </p>
      </section>

      <CreateQuoteForm />
    </div>
  );
};

export default CreateQuote;
