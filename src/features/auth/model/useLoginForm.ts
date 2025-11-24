import { FormEvent } from 'react';
import { useRouter } from '@tanstack/react-router';

import { useLogin } from '@features/auth/api';
import { hashPassword, useAuth } from '@features/auth/model';

const useRegisterForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { mutateAsync, isPending, error } = useLogin();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();

    if (!username || !password) {
      return;
    }

    const passwordHash = await hashPassword(password);

    const user = await mutateAsync({
      username,
      password: passwordHash,
    });

    login(user);
    router.history.back();
  };

  return { handleLogin, isPending, error };
};

export default useRegisterForm;
