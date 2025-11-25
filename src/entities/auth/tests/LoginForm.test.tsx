import { BaseSyntheticEvent, ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { LoginForm } from '@entities/auth';
import type { LoginFormValues } from '@features/auth/model';

describe('LoginForm', () => {
  const renderLoginForm = (
    props?: Partial<ComponentProps<typeof LoginForm>>
  ) => {
    const defaultProps: ComponentProps<typeof LoginForm> = {
      submitHandler: jest.fn() as (e?: BaseSyntheticEvent) => Promise<void>,
      onSwitchToRegister: jest.fn(),
      isPending: false,
      serverError: null,
      isSubmitting: false,
      errors: {},
      register: (() => ({
        onChange: () => {},
        onBlur: () => {},
        name: '',
        ref: () => {},
      })) as unknown as UseFormRegister<LoginFormValues>,
    };

    return render(<LoginForm {...defaultProps} {...props} />);
  };

  it('renders fields and submit button', () => {
    renderLoginForm();

    expect(
      screen.getByRole('heading', { name: /sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/password/i, { selector: 'input' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create one/i })
    ).toBeInTheDocument();
  });

  it('calls submitHandler on form submit', async () => {
    const user = userEvent.setup();
    const submitHandler = jest.fn().mockResolvedValue(undefined);

    renderLoginForm({ submitHandler });

    const button = screen.getByRole('button', { name: /sign in/i });
    await user.click(button);

    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  it('shows server error message when serverError is provided', () => {
    const error = new Error('Invalid credentials');

    renderLoginForm({ serverError: error });

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
  });

  it('shows validation errors for username and password', () => {
    const errors: FieldErrors<LoginFormValues> = {
      username: { type: 'required', message: 'Username is required' },
      password: { type: 'required', message: 'Password is required' },
    };

    renderLoginForm({ errors });

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('disables submit button when isPending is true', () => {
    renderLoginForm({ isPending: true });

    const button = screen.getByRole('button', { name: /signing in…/i });
    expect(button).toBeDisabled();
  });

  it('disables submit button when isSubmitting is true', () => {
    renderLoginForm({ isSubmitting: true });

    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeDisabled();
  });

  it('calls onSwitchToRegister when "Create one" button is clicked', async () => {
    const user = userEvent.setup();
    const onSwitchToRegister = jest.fn();

    renderLoginForm({ onSwitchToRegister });

    const linkButton = screen.getByRole('button', { name: /create one/i });
    await user.click(linkButton);

    expect(onSwitchToRegister).toHaveBeenCalledTimes(1);
  });
});
