import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('@tanstack/react-router', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} data-testid="redirect-link">
      {children}
    </a>
  ),
}));

import RedirectSection from '../RedirectSection';

describe('RedirectSection', () => {
  const defaultProps = {
    title: 'User created quotes',
    description: 'View quotes added by users.',
    button: 'Go to user quotes',
    to: '/user-quotes',
  };

  it('renders title, description and button text', () => {
    render(<RedirectSection {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: /user created quotes/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/view quotes added by users\./i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /go to user quotes/i })
    ).toBeInTheDocument();
  });

  it('renders link with correct "to" (href)', () => {
    render(<RedirectSection {...defaultProps} />);

    const link = screen.getByTestId('redirect-link');
    expect(link).toHaveAttribute('href', '/user-quotes');
  });

  it('merges additional className with base classes', () => {
    const { container } = render(
      <RedirectSection {...defaultProps} className="mt-10 bg-red-500" />
    );

    const section = container.firstElementChild!;

    expect(section).toHaveClass('border');
    expect(section).toHaveClass('flex');
    expect(section).toHaveClass('rounded-xl');

    expect(section).toHaveClass('mt-10');
    expect(section).toHaveClass('bg-red-500');
  });

  it('matches snapshot', () => {
    const { container } = render(<RedirectSection {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
