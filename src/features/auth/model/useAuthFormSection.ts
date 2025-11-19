import { FormEvent, useState } from 'react';
import { useRouter } from '@tanstack/react-router';

import { useLogin, useRegister } from '@features/auth/api';
import { AuthMode, useAuth } from '@features/auth/model';

const useAuthFormSection = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const router = useRouter();
  const { login } = useAuth();
  const {
    mutateAsync: registerMutate,
    isPending: isRegisterPending,
    error: registerError,
  } = useRegister();
  const {
    mutateAsync: loginMutate,
    isPending: isLoginPending,
    error: loginError,
  } = useLogin();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();
    const repeatPassword = String(formData.get('repeatPassword') ?? '').trim();

    if (!username || !password) {
      return;
    }

    if (password !== repeatPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    setPasswordError(null);

    const user = await registerMutate({ username, password });
    login(user);
    router.navigate({ to: '/' });
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();

    if (!username || !password) {
      return;
    }

    const user = await loginMutate({ username, password });
    login(user);
    router.navigate({ to: '/' });
  };

  return {
    mode,
    handleLogin,
    isLoginPending,
    loginError,
    setMode,
    handleRegister,
    isRegisterPending,
    registerError,
    passwordError,
  };
};

export default useAuthFormSection;
