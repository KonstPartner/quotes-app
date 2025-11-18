import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import QuoteForm from '../QuoteForm';

describe('CreateForm', () => {
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
      screen.getByRole('heading', { name: /add your quote/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/quote/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /save quote/i })
    ).toBeInTheDocument();
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

    const button = screen.getByRole('button');
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

    const button = screen.getByRole('button');

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

    expect(screen.getByText(/failed to save quote/i)).toBeInTheDocument();
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
