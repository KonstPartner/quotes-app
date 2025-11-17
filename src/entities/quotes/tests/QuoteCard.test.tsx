import { render } from '@testing-library/react';

import type { Quote } from '@features/quotes/model';

import QuoteCard from '../QuoteCard';

describe('QuoteCard snapshot', () => {
  it('renders quote card correctly', () => {
    const mockQuote: Quote = {
      id: 1,
      author: 'Rumi',
      quote: 'Your heart is the size of an ocean.',
    };

    const { container } = render(<QuoteCard quoteData={mockQuote} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
