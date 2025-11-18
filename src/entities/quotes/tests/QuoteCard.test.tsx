import { render } from '@testing-library/react';

import { QuoteCard } from '@entities/quotes';
import type { Quote } from '@features/quotes/model';

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
