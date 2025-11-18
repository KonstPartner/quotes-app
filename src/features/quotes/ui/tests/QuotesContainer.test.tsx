import { fireEvent, render, screen } from '@testing-library/react';

import { useSuspenseQuotes } from '@features/quotes/api';
import useScrollIntoView from '@hooks/useScrollIntoView';

import QuotesContainer from '../QuotesContainer';

jest.mock('@features/quotes/api');
jest.mock('@hooks/useScrollIntoView');

const mockedUseSuspenseQuotesPage = useSuspenseQuotes as jest.MockedFunction<
  typeof useSuspenseQuotes
>;
const mockedUseScrollIntoView = useScrollIntoView as jest.MockedFunction<
  typeof useScrollIntoView
>;

describe('QuotesSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders quotes from current page and pagination bar', () => {
    const refetchMock = jest.fn();
    const firstPageQuotes = [
      { id: 1, author: 'Rumi', quote: 'First quote' },
      { id: 2, author: 'Einstein', quote: 'Second quote' },
    ];

    mockedUseSuspenseQuotesPage.mockImplementation(() => ({
      quotes: firstPageQuotes,
      totalPages: 3,
      refetch: refetchMock,
    }));

    const handleScrollMock = jest.fn();
    mockedUseScrollIntoView.mockReturnValue({
      ref: { current: null },
      handleScroll: handleScrollMock,
    });

    render(<QuotesContainer />);

    expect(screen.getByText(/First quote/i)).toBeInTheDocument();
    expect(screen.getByText(/Second quote/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  it('calls page change handler when user clicks on another page', () => {
    const refetchMock = jest.fn();
    const firstPageQuotes = [{ id: 1, author: 'Rumi', quote: 'First quote' }];

    mockedUseSuspenseQuotesPage.mockImplementation(() => ({
      quotes: firstPageQuotes,
      totalPages: 5,
      refetch: refetchMock,
    }));

    const handleScrollMock = jest.fn();
    mockedUseScrollIntoView.mockReturnValue({
      ref: { current: null },
      handleScroll: handleScrollMock,
    });

    render(<QuotesContainer />);

    const page2Button = screen.getByRole('button', { name: '2' });
    fireEvent.click(page2Button);

    expect(handleScrollMock).toHaveBeenCalledWith(2);
  });
});
