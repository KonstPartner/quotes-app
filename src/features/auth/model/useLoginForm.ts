import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { useLogin } from '@features/auth/api';
import { hashPassword, LoginFormValues, useAuth } from '@features/auth/model';

const useLoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { mutateAsync, isPending, error: serverError } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const submitHandler = handleSubmit(async ({ username, password }) => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      return;
    }

    const passwordHash = await hashPassword(trimmedPassword);

    const user = await mutateAsync({
      username: trimmedUsername,
      password: passwordHash,
    });

    login(user);
    router.history.back();
  });

  return {
    formErrors,
    register,
    submitHandler,
    isPending,
    serverError,
    isSubmitting,
  };
};

export default useLoginForm;
