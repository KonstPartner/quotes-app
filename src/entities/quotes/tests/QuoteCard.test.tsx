jest.mock('@features/auth/model', () => ({
  useAuth: () => ({
    user: { id: 1, username: 'test' },
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: true,
  }),
}));

import { render } from '@testing-library/react';

import { QuoteCard } from '@entities/quotes';
import type { LocalQuote } from '@features/quotes/model';

describe('QuoteCard snapshot', () => {
  it('renders quote card correctly', () => {
    const mockQuote: LocalQuote = {
      id: 1,
      author: 'Rumi',
      quote: 'Your heart is the size of an ocean.',
      userId: 1,
    };

    const { container } = render(<QuoteCard quoteData={mockQuote} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
