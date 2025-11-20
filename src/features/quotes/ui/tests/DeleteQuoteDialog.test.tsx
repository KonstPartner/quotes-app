jest.mock('@features/quotes/api', () => ({
  useDeleteLocalQuote: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useDeleteLocalQuote } from '@features/quotes/api';

import DeleteQuoteDialog from '../DeleteQuoteDialog';

const mockedUseDeleteLocalQuote = useDeleteLocalQuote as jest.MockedFunction<
  typeof useDeleteLocalQuote
>;

describe('DeleteQuoteDialog', () => {
  const quoteId = 10;
  const userId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders delete trigger button', () => {
    mockedUseDeleteLocalQuote.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useDeleteLocalQuote>);

    render(<DeleteQuoteDialog quoteId={quoteId} userId={userId} />);

    const button = screen.getByRole('button', { name: /delete this quote/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('opens confirmation dialog on trigger click', async () => {
    const user = userEvent.setup();

    mockedUseDeleteLocalQuote.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useDeleteLocalQuote>);

    render(<DeleteQuoteDialog quoteId={quoteId} userId={userId} />);

    const trigger = screen.getByRole('button', { name: /delete this quote/i });

    await user.click(trigger);

    expect(screen.getByText(/delete this quote\?/i)).toBeInTheDocument();

    expect(
      screen.getByText(/this action cannot be undone/i)
    ).toBeInTheDocument();
  });

  it('calls mutate with correct payload when confirming delete', async () => {
    const user = userEvent.setup();
    const mutateMock = jest.fn();

    mockedUseDeleteLocalQuote.mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    } as unknown as ReturnType<typeof useDeleteLocalQuote>);

    render(<DeleteQuoteDialog quoteId={quoteId} userId={userId} />);

    const trigger = screen.getByRole('button', { name: /delete this quote/i });
    await user.click(trigger);

    const confirmButton = screen.getByRole('button', { name: /^delete$/i });
    await user.click(confirmButton);

    expect(mutateMock).toHaveBeenCalledTimes(1);
    expect(mutateMock).toHaveBeenCalledWith({ id: quoteId, userId });
  });

  it('disables trigger button when isPending is true', () => {
    mockedUseDeleteLocalQuote.mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    } as unknown as ReturnType<typeof useDeleteLocalQuote>);

    render(<DeleteQuoteDialog quoteId={quoteId} userId={userId} />);

    const trigger = screen.getByRole('button', { name: /delete this quote/i });
    expect(trigger).toBeDisabled();
  });
});
