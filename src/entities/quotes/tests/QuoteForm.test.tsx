import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { QuoteForm } from '@entities/quotes';

describe('CreateForm', () => {
  const { getByRole, getByLabelText, getByText } = screen;

  it('renders form fields and submit button', () => {
    const handleSubmitMock = jest.fn(
      async (_: { quote: string; author: string }) => {}
    );

    render(
      <QuoteForm
        title="Add your quote"
        initialQuote=""
        initialAuthor=""
        submitLabel="Save quote"
        isPending={false}
        error={null}
        onSubmit={handleSubmitMock}
      />
    );

    expect(
      getByRole('heading', { name: /add your quote/i })
    ).toBeInTheDocument();

    expect(getByLabelText(/quote/i)).toBeInTheDocument();
    expect(getByLabelText(/author/i)).toBeInTheDocument();

    expect(getByRole('button', { name: /save quote/i })).toBeInTheDocument();
  });

  it('calls handleSubmit when form is submitted', async () => {
    const user = userEvent.setup();

    const handleSubmitMock = jest.fn(
      async (_: { quote: string; author: string }) => {}
    );

    render(
      <QuoteForm
        title="Add your quote"
        initialQuote="some quote"
        initialAuthor="some author"
        submitLabel="Save quote"
        isPending={false}
        error={null}
        onSubmit={handleSubmitMock}
      />
    );

    const button = getByRole('button', { name: /save quote/i });
    await user.click(button);

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('disables submit button when isDisabled is true', () => {
    const handleSubmitMock = jest.fn(
      async (_: { quote: string; author: string }) => {}
    );

    render(
      <QuoteForm
        title="Add your quote"
        initialQuote=""
        initialAuthor=""
        submitLabel="Save quote"
        isPending={true}
        error={null}
        onSubmit={handleSubmitMock}
      />
    );

    const button = getByRole('button', { name: /saving…/i });

    expect(button).toBeDisabled();
  });

  it('shows error message when error is present', () => {
    const handleSubmitMock = jest.fn(
      async (_: { quote: string; author: string }) => {}
    );

    render(
      <QuoteForm
        title="Add your quote"
        initialQuote=""
        initialAuthor=""
        submitLabel="Save quote"
        isPending={false}
        error={new Error('Something went wrong')}
        onSubmit={handleSubmitMock}
      />
    );

    expect(getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('passes form values to onSubmit', async () => {
    const user = userEvent.setup();

    const handleSubmitMock = jest.fn(
      async (_: { quote: string; author: string }) => {}
    );

    render(
      <QuoteForm
        title="Add your quote"
        initialQuote=""
        initialAuthor=""
        submitLabel="Save quote"
        isPending={false}
        error={null}
        onSubmit={handleSubmitMock}
      />
    );

    const quoteInput = getByLabelText(/quote/i);
    const authorInput = getByLabelText(/author/i);
    const button = getByRole('button', { name: /save quote/i });

    await user.type(quoteInput, 'Test quote');
    await user.type(authorInput, 'Test author');
    await user.click(button);

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
    expect(handleSubmitMock).toHaveBeenCalledWith({
      quote: 'Test quote',
      author: 'Test author',
    });
  });

  it('does not call onSubmit when fields are empty', async () => {
    const user = userEvent.setup();
    const handleSubmitMock = jest.fn(
      async (_: { quote: string; author: string }) => {}
    );

    render(
      <QuoteForm
        title="Add your quote"
        initialQuote=""
        initialAuthor=""
        submitLabel="Save quote"
        isPending={false}
        error={null}
        onSubmit={handleSubmitMock}
      />
    );

    const button = getByRole('button', { name: /save quote/i });

    await user.click(button);

    expect(handleSubmitMock).not.toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const handleSubmitMock = jest.fn(
      async (_: { quote: string; author: string }) => {}
    );

    const { container } = render(
      <QuoteForm
        title="Add your quote"
        initialQuote=""
        initialAuthor=""
        submitLabel="Save quote"
        isPending={false}
        error={new Error('Something went wrong')}
        onSubmit={handleSubmitMock}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
