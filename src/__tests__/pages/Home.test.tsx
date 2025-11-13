import { render, screen } from '@testing-library/react';

import Home from '@pages/Home';

describe('Home page', () => {
  it('renders the Home Page text', () => {
    render(<Home />);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
