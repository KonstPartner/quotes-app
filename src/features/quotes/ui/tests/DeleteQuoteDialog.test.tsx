jest.mock('@features/quotes/api', () => ({
  useDeleteLocalQuote: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useDeleteLocalQuote } from '@features/quotes/api';
import { DeleteQuoteDialog } from '@features/quotes/ui';

const mockedUseDeleteLocalQuote = useDeleteLocalQuote as jest.MockedFunction<
  typeof useDeleteLocalQuote
>;

describe('DeleteQuoteDialog', () => {
  const { getByRole, getByText } = screen;
  const quoteId = 10;
  const userId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders trigger button', () => {
    mockedUseDeleteLocalQuote.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      error: null,
    } as unknown as ReturnType<typeof useDeleteLocalQuote>);

    render(<DeleteQuoteDialog quoteId={quoteId} userId={userId} />);

    const trigger = getByRole('button', { name: /delete this quote/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toBeEnabled();
  });

  it('opens dialog on trigger click', async () => {
    const user = userEvent.setup();

    mockedUseDeleteLocalQuote.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      error: null,
    } as unknown as ReturnType<typeof useDeleteLocalQuote>);

    render(<DeleteQuoteDialog quoteId={quoteId} userId={userId} />);

    const trigger = getByRole('button', { name: /delete this quote/i });
    await user.click(trigger);

    expect(getByText(/delete this quote\?/i)).toBeInTheDocument();
    expect(getByText(/this action cannot be undone/i)).toBeInTheDocument();
  });

  it('calls mutate with id and userId on confirm', async () => {
    const user = userEvent.setup();
    const mutateMock = jest.fn();

    mockedUseDeleteLocalQuote.mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      error: null,
    } as unknown as ReturnType<typeof useDeleteLocalQuote>);

    render(<DeleteQuoteDialog quoteId={quoteId} userId={userId} />);

    const trigger = getByRole('button', { name: /delete this quote/i });
    await user.click(trigger);

    const confirmButton = getByRole('button', { name: /^delete$/i });
    await user.click(confirmButton);

    expect(mutateMock).toHaveBeenCalledTimes(1);
    expect(mutateMock).toHaveBeenCalledWith(
      { id: quoteId, userId },
      expect.objectContaining({
        onSuccess: expect.any(Function),
      })
    );
  });

  it('shows error message when error is present', async () => {
    const user = userEvent.setup();

    mockedUseDeleteLocalQuote.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      error: new Error('Something went wrong'),
    } as unknown as ReturnType<typeof useDeleteLocalQuote>);

    render(<DeleteQuoteDialog quoteId={quoteId} userId={userId} />);

    const trigger = getByRole('button', { name: /delete this quote/i });
    await user.click(trigger);

    expect(getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
