jest.mock('@features/quotes/api', () => ({
  useRandomQuote: jest.fn(),
}));

jest.mock('@entities/quotes', () => ({
  QuoteCard: ({ quoteData }: { quoteData: { quote: string } }) => (
    <div data-testid="quote-card">{quoteData.quote}</div>
  ),
}));

import { UseQueryResult } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useRandomQuote } from '@features/quotes/api';
import { Quote } from '@features/quotes/model';
import { RandomQuote } from '@features/quotes/ui';

const mockedUseRandomQuote = useRandomQuote as jest.Mock<
  Partial<UseQueryResult<Quote, Error>>,
  []
>;

describe('RandomQuote', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when isPending is true', () => {
    mockedUseRandomQuote.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false,
    });

    render(<RandomQuote />);

    expect(screen.getByText(/loading a quote…/i)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /finding quote…/i });
    expect(button).toBeDisabled();
  });

  it('renders error message when isError is true', () => {
    mockedUseRandomQuote.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      error: new Error('Boom'),
      refetch: jest.fn(),
      isRefetching: false,
    });

    render(<RandomQuote />);

    expect(screen.getByText(/failed to load quote: boom/i)).toBeInTheDocument();
  });

  it('renders QuoteCard when quote is loaded', () => {
    mockedUseRandomQuote.mockReturnValue({
      data: { id: 1, author: 'Rumi', quote: 'Test quote' },
      isPending: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
      isRefetching: false,
    });

    render(<RandomQuote />);

    expect(screen.getByTestId('quote-card')).toHaveTextContent('Test quote');

    const button = screen.getByRole('button', { name: /find another/i });
    expect(button).toBeEnabled();
  });

  it('calls refetch when button is clicked', async () => {
    const user = userEvent.setup();
    const refetchMock = jest.fn();

    mockedUseRandomQuote.mockReturnValue({
      data: { id: 1, author: 'Rumi', quote: 'Test quote' },
      isPending: false,
      isError: false,
      error: null,
      refetch: refetchMock,
      isRefetching: false,
    });

    render(<RandomQuote />);

    const button = screen.getByRole('button', { name: /find another/i });

    await user.click(button);

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });
});
