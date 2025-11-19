import { useMutation } from '@tanstack/react-query';

import { authApi } from '@features/auth/api';
import type { LoginPayload, RegisterPayload, User } from '@features/auth/model';

export const useLogin = () => {
  return useMutation<User, Error, LoginPayload>({
    mutationFn: (payload) => authApi.login(payload),
  });
};

export const useRegister = () => {
  return useMutation<User, Error, RegisterPayload>({
    mutationFn: (payload) => authApi.register(payload),
  });
};
