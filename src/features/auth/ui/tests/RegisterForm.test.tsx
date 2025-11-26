import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { type RegisterFormValues, useRegisterForm } from '@features/auth/model';
import { RegisterForm } from '@features/auth/ui';

jest.mock('@features/auth/model', () => ({
  ...jest.requireActual('@features/auth/model'),
  useRegisterForm: jest.fn(),
}));

const mockedUseRegisterForm = useRegisterForm as jest.MockedFunction<
  typeof useRegisterForm
>;

const createRegisterMock = () =>
  ((name: keyof RegisterFormValues) => ({
    name,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  })) as unknown as UseFormRegister<RegisterFormValues>;

const createDefaultHookReturn = (
  overrides?: Partial<ReturnType<typeof useRegisterForm>>
): ReturnType<typeof useRegisterForm> => ({
  submitHandler: jest.fn(),
  isPending: false,
  isSubmitting: false,
  formErrors: {} as FieldErrors<RegisterFormValues>,
  serverError: null,
  password: 'Password123',
  register: createRegisterMock(),
  ...overrides,
});

const renderRegisterForm = (
  hookOverrides?: Partial<ReturnType<typeof useRegisterForm>>
) => {
  mockedUseRegisterForm.mockReturnValue(createDefaultHookReturn(hookOverrides));

  const onSwitchToLogin = jest.fn();

  const utils = render(<RegisterForm onSwitchToLogin={onSwitchToLogin} />);

  return {
    onSwitchToLogin,
    ...utils,
  };
};

describe('RegisterForm', () => {
  const { getByRole, getByLabelText, getByText } = screen;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders main fields and submit button', () => {
    renderRegisterForm();

    expect(
      getByRole('heading', { name: /create account/i })
    ).toBeInTheDocument();

    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(
      getByLabelText(/^new password/i, { selector: 'input' })
    ).toBeInTheDocument();
    expect(
      getByLabelText(/repeat new password/i, { selector: 'input' })
    ).toBeInTheDocument();

    expect(getByText(/gender/i)).toBeInTheDocument();
    expect(getByLabelText(/^male$/i)).toBeInTheDocument();
    expect(getByLabelText(/female/i)).toBeInTheDocument();
    expect(getByLabelText(/other/i)).toBeInTheDocument();

    expect(getByLabelText(/how did you hear about us\?/i)).toBeInTheDocument();

    expect(getByText(/date of birth/i)).toBeInTheDocument();
    expect(getByText(/day/i)).toBeInTheDocument();
    expect(getByText(/month/i)).toBeInTheDocument();
    expect(getByText(/year/i)).toBeInTheDocument();

    expect(getByText(/subscribe to our newsletter/i)).toBeInTheDocument();
    expect(getByText(/i accept the terms and conditions/i)).toBeInTheDocument();

    expect(getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders server error message when serverError is provided', () => {
    renderRegisterForm({
      serverError: new Error('Server exploded'),
    });

    expect(getByRole('alert')).toHaveTextContent('Server exploded');
  });

  it('renders validation errors from react-hook-form', () => {
    const formErrors: FieldErrors<RegisterFormValues> = {
      username: { type: 'required', message: 'Username is required' },
      password: { type: 'minLength', message: 'Password too short' },
      repeatPassword: {
        type: 'validate',
        message: "Passwords don't match",
      },
      gender: { type: 'required', message: 'Please select your gender' },
      source: { type: 'required', message: 'Please select an option' },
      birthDay: { type: 'required', message: 'Day is required' },
    };

    renderRegisterForm({ formErrors });

    expect(getByText(/username is required/i)).toBeInTheDocument();
    expect(getByText(/password too short/i)).toBeInTheDocument();
    expect(getByText(/passwords don't match/i)).toBeInTheDocument();
    expect(getByText(/please select your gender/i)).toBeInTheDocument();
    expect(getByText(/please select an option/i)).toBeInTheDocument();
    expect(getByText(/day is required/i)).toBeInTheDocument();
  });

  it('disables submit button when pending', () => {
    renderRegisterForm({ isPending: true });

    const button = getByRole('button', { name: /creating…/i });
    expect(button).toBeDisabled();
  });

  it('disables submit button when submitting', () => {
    renderRegisterForm({ isSubmitting: true });

    const button = getByRole('button', { name: /creating…/i });
    expect(button).toBeDisabled();
  });

  it('calls submitHandler on form submit', async () => {
    const user = userEvent.setup();
    const submitHandler = jest.fn();

    renderRegisterForm({ submitHandler });

    const button = getByRole('button', { name: /sign up/i });
    await user.click(button);

    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  it('calls onSwitchToLogin when clicking "Sign in" button', async () => {
    const user = userEvent.setup();
    const { onSwitchToLogin } = renderRegisterForm();

    const switchButton = getByRole('button', { name: /sign in/i });
    await user.click(switchButton);

    expect(onSwitchToLogin).toHaveBeenCalledTimes(1);
  });
});
