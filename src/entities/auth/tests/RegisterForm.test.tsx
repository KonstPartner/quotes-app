import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { BaseSyntheticEvent, ComponentProps } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { RegisterForm } from '@entities/auth';
import type { RegisterFormValues } from '@features/auth/model';

type Props = ComponentProps<typeof RegisterForm>;

const createRegisterMock = () =>
  ((name: keyof RegisterFormValues) => {
    return {
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    };
  }) as unknown as UseFormRegister<RegisterFormValues>;

const renderRegisterForm = (overrideProps: Partial<Props> = {}) => {
  const submitHandler = jest
    .fn<Promise<void>, [e?: BaseSyntheticEvent]>()
    .mockResolvedValue();

  const onSwitchToLogin = jest.fn();

  const props: Props = {
    submitHandler,
    onSwitchToLogin,
    isPending: false,
    serverError: null,
    errors: {},
    register: createRegisterMock(),
    password: 'Password123',
    isSubmitting: false,
    ...overrideProps,
  };

  const utils = render(<RegisterForm {...props} />);

  return {
    submitHandler,
    onSwitchToLogin,
    ...utils,
  };
};

describe('RegisterForm', () => {
  it('renders main fields and submit button', () => {
    renderRegisterForm();

    expect(
      screen.getByRole('heading', { name: /create account/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();

    expect(
      screen.getByLabelText(/^new password/i, { selector: 'input' })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/repeat new password/i, { selector: 'input' })
    ).toBeInTheDocument();

    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^male$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/female/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/other/i)).toBeInTheDocument();

    expect(
      screen.getByLabelText(/how did you hear about us\?/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByText(/day/i)).toBeInTheDocument();
    expect(screen.getByText(/month/i)).toBeInTheDocument();
    expect(screen.getByText(/year/i)).toBeInTheDocument();

    expect(
      screen.getByText(/subscribe to our newsletter/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/i accept the terms and conditions/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('renders server error message when serverError is provided', () => {
    renderRegisterForm({
      serverError: new Error('Server exploded'),
    });

    expect(screen.getByRole('alert')).toHaveTextContent('Server exploded');
  });

  it('renders validation errors from react-hook-form', () => {
    renderRegisterForm({
      errors: {
        username: { type: 'required', message: 'Username is required' },
        password: { type: 'minLength', message: 'Password too short' },
        repeatPassword: { type: 'validate', message: "Passwords don't match" },
        gender: { type: 'required', message: 'Please select your gender' },
        source: { type: 'required', message: 'Please select an option' },
      } as FieldErrors<RegisterFormValues>,
    });

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password too short/i)).toBeInTheDocument();
    expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    expect(screen.getByText(/please select your gender/i)).toBeInTheDocument();
    expect(screen.getByText(/please select an option/i)).toBeInTheDocument();
  });

  it('disables submit button when pending or submitting', () => {
    const { rerender } = renderRegisterForm({
      isPending: true,
    });

    let button = screen.getByRole('button', { name: /sign up|creating/i });
    expect(button).toBeDisabled();

    rerender(
      <RegisterForm
        submitHandler={jest.fn()}
        onSwitchToLogin={jest.fn()}
        isPending={false}
        serverError={null}
        errors={{}}
        register={createRegisterMock()}
        password="Password123"
        isSubmitting={true}
      />
    );

    button = screen.getByRole('button', { name: /sign up|creating/i });
    expect(button).toBeDisabled();
  });

  it('calls submitHandler on form submit', async () => {
    const user = userEvent.setup();
    const { submitHandler } = renderRegisterForm();

    const button = screen.getByRole('button', { name: /sign up/i });
    await user.click(button);

    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  it('calls onSwitchToLogin when clicking "Sign in" button', async () => {
    const user = userEvent.setup();
    const { onSwitchToLogin } = renderRegisterForm();

    const switchButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(switchButton);

    expect(onSwitchToLogin).toHaveBeenCalledTimes(1);
  });
});
