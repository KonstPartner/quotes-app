import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { LoginFormValues } from '@features/auth/model';
import { useLoginForm } from '@features/auth/model';
import { LoginForm } from '@features/auth/ui';

jest.mock('@features/auth/model', () => ({
  ...jest.requireActual('@features/auth/model'),
  useLoginForm: jest.fn(),
}));

const mockedUseLoginForm = useLoginForm as jest.MockedFunction<
  typeof useLoginForm
>;

const createRegisterMock = () =>
  (() => ({
    onChange: jest.fn(),
    onBlur: jest.fn(),
    name: '',
    ref: jest.fn(),
  })) as unknown as UseFormRegister<LoginFormValues>;

const createDefaultHookReturn = (
  overrides?: Partial<ReturnType<typeof useLoginForm>>
): ReturnType<typeof useLoginForm> => ({
  submitHandler: jest.fn(),
  isPending: false,
  isSubmitting: false,
  formErrors: {} as FieldErrors<LoginFormValues>,
  serverError: null,
  register: createRegisterMock(),
  ...overrides,
});

describe('LoginForm', () => {
  const { getByRole, getByLabelText, getByText } = screen;
  const renderLoginForm = (
    hookOverrides?: Partial<ReturnType<typeof useLoginForm>>
  ) => {
    mockedUseLoginForm.mockReturnValue(createDefaultHookReturn(hookOverrides));

    const onSwitchToRegister = jest.fn();

    return {
      onSwitchToRegister,
      ...render(<LoginForm onSwitchToRegister={onSwitchToRegister} />),
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders fields and submit button', () => {
    renderLoginForm();

    expect(getByRole('heading', { name: /sign in/i })).toBeInTheDocument();

    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(
      getByLabelText(/password/i, { selector: 'input' })
    ).toBeInTheDocument();

    expect(getByRole('button', { name: /sign in/i })).toBeInTheDocument();

    expect(getByRole('button', { name: /create one/i })).toBeInTheDocument();
  });

  it('calls submitHandler on form submit', async () => {
    const user = userEvent.setup();
    const submitHandler = jest.fn();

    renderLoginForm({ submitHandler });

    const button = getByRole('button', { name: /sign in/i });
    await user.click(button);

    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  it('shows server error message when serverError is provided', () => {
    const serverError = new Error('Invalid credentials');

    renderLoginForm({ serverError });

    expect(getByRole('alert')).toHaveTextContent('Invalid credentials');
  });

  it('shows validation errors for username and password', () => {
    const formErrors: FieldErrors<LoginFormValues> = {
      username: { type: 'required', message: 'Username is required' },
      password: { type: 'required', message: 'Password is required' },
    };

    renderLoginForm({ formErrors });

    expect(getByText(/username is required/i)).toBeInTheDocument();
    expect(getByText(/password is required/i)).toBeInTheDocument();
  });

  it('disables submit button when isPending is true', () => {
    renderLoginForm({ isPending: true });

    const button = getByRole('button', { name: /signing in…/i });
    expect(button).toBeDisabled();
  });

  it('disables submit button when isSubmitting is true', () => {
    renderLoginForm({ isSubmitting: true });

    const button = getByRole('button', { name: /sign in/i });
    expect(button).toBeDisabled();
  });

  it('calls onSwitchToRegister when "Create one" button is clicked', async () => {
    const user = userEvent.setup();
    const { onSwitchToRegister } = renderLoginForm();

    const linkButton = getByRole('button', { name: /create one/i });
    await user.click(linkButton);

    expect(onSwitchToRegister).toHaveBeenCalledTimes(1);
  });
});
