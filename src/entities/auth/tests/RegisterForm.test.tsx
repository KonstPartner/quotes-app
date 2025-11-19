import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegisterForm } from '@entities/auth';

describe('RegisterForm', () => {
  it('renders fields', () => {
    render(
      <RegisterForm
        handleRegister={jest.fn()}
        onSwitchToLogin={jest.fn()}
        isPending={false}
        error={null}
      />
    );

    expect(
      screen.getByRole('heading', { name: /create account/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^username$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^new password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/repeat new password/i)).toBeInTheDocument();
  });

  it('calls handleRegister on submit', async () => {
    const user = userEvent.setup();
    const handleRegister = jest.fn((e) => e.preventDefault());

    render(
      <RegisterForm
        handleRegister={handleRegister}
        onSwitchToLogin={jest.fn()}
        isPending={false}
        error={null}
      />
    );

    await user.type(screen.getByLabelText(/^username$/i), 'some user');
    await user.type(screen.getByLabelText(/^new password$/i), 'secret123');
    await user.type(screen.getByLabelText(/repeat new password/i), 'secret123');

    await user.click(screen.getByRole('button', { name: /sign up/i }));
    expect(handleRegister).toHaveBeenCalledTimes(1);
  });
});
