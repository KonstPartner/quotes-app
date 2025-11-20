jest.mock('@features/auth/model', () => ({
  useAuthFormSection: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useAuthFormSection } from '@features/auth/model';
import { AuthFormSection } from '@features/auth/ui';

describe('AuthFormSection', () => {
  it('renders LoginForm when mode is login', () => {
    (useAuthFormSection as jest.Mock).mockReturnValue({
      mode: 'login',
      handleLogin: jest.fn(),
      isLoginPending: false,
      loginError: null,
      setMode: jest.fn(),
      handleRegister: jest.fn(),
      isRegisterPending: false,
      registerError: null,
      passwordError: null,
    });

    render(<AuthFormSection />);

    expect(
      screen.getByRole('heading', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('switches from login to register when "Create one" is clicked', async () => {
    const user = userEvent.setup();
    const setMode = jest.fn();

    (useAuthFormSection as jest.Mock).mockReturnValue({
      mode: 'login',
      handleLogin: jest.fn(),
      isLoginPending: false,
      loginError: null,
      setMode,
      handleRegister: jest.fn(),
      isRegisterPending: false,
      registerError: null,
      passwordError: null,
    });

    render(<AuthFormSection />);

    await user.click(screen.getByRole('button', { name: /create one/i }));
    expect(setMode).toHaveBeenCalledWith('register');
  });
});
