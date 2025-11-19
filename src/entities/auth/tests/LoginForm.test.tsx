import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from '@entities/auth';

describe('LoginForm', () => {
  it('renders fields and submit button', () => {
    render(
      <LoginForm
        onSwitchToRegister={jest.fn()}
        handleLogin={jest.fn()}
        isPending={false}
        error={null}
      />
    );

    expect(
      screen.getByRole('heading', { name: /sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/^password$/i, { selector: 'input' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('calls handleLogin on submit', async () => {
    const user = userEvent.setup();
    const handleLogin = jest.fn((e) => e.preventDefault());

    render(
      <LoginForm
        onSwitchToRegister={jest.fn()}
        handleLogin={handleLogin}
        isPending={false}
        error={null}
      />
    );

    await user.type(screen.getByLabelText(/^username$/i), 'user');
    await user.type(screen.getByLabelText(/^password$/i), 'secret123');

    await user.click(screen.getByRole('button', { name: /sign in/i }));
    expect(handleLogin).toHaveBeenCalledTimes(1);
  });

  it('shows error message when error is passed', () => {
    const error = new Error('Invalid credentials');

    render(
      <LoginForm
        onSwitchToRegister={jest.fn()}
        handleLogin={jest.fn()}
        isPending={false}
        error={error}
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
  });
});
