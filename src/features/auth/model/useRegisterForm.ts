import { FormEvent, useState } from 'react';
import { useRouter } from '@tanstack/react-router';

import { useRegister } from '@features/auth/api';
import { hashPassword, useAuth } from '@features/auth/model';

const useRegisterForm = () => {
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const router = useRouter();
  const { login } = useAuth();
  const { mutateAsync, isPending, error } = useRegister();

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

    const passwordHash = await hashPassword(password);

    const user = await mutateAsync({
      username,
      password: passwordHash,
    });

    login(user);
    router.history.back();
  };

  return { handleRegister, isPending, error, passwordError };
};

export default useRegisterForm;
