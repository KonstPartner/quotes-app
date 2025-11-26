jest.mock('@features/auth/model', () => ({
  useAuth: () => ({
    user: { id: 1, username: 'test' },
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: true,
  }),
}));

import { createRef } from 'react';
import { render, screen } from '@testing-library/react';

import { QuotesList } from '@entities/quotes';
import type { Quote } from '@features/quotes/model';

describe('QuotesList', () => {
  const { getAllByRole, queryAllByRole } = screen;

  it('renders a QuoteCard for each quote', () => {
    const quotes: Quote[] = [
      { id: 1, author: 'Rumi', quote: 'First quote' },
      { id: 2, author: 'Einstein', quote: 'Second quote' },
      { id: 3, author: 'Abdul Kalam', quote: 'Third quote' },
    ];

    const listRef = createRef<HTMLDivElement>();

    render(<QuotesList listRef={listRef} quotes={quotes} />);

    const cards = getAllByRole('article');
    expect(cards).toHaveLength(quotes.length);

    expect(listRef.current).not.toBeNull();
    expect(listRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders nothing when quotes array is empty', () => {
    const listRef = createRef<HTMLDivElement>();

    render(<QuotesList listRef={listRef} quotes={[]} />);

    const cards = queryAllByRole('article');
    expect(cards).toHaveLength(0);
  });
});
