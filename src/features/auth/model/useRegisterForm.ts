import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { useRegister } from '@features/auth/api';
import {
  hashPassword,
  RegisterFormValues,
  RegisterPayload,
  useAuth,
} from '@features/auth/model';

const useRegisterForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { mutateAsync, isPending, error: registerError } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<RegisterFormValues>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      repeatPassword: '',
      gender: undefined,
      source: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      newsletter: false,
      acceptTerms: false,
    },
  });
  const password = watch('password');

  const submitHandler = handleSubmit(
    ({ repeatPassword: _, acceptTerms: __, ...payload }) => onSubmit(payload)
  );

  const onSubmit = async (values: RegisterPayload) => {
    const passwordHash = await hashPassword(values.password);

    const user = await mutateAsync({
      ...values,
      password: passwordHash,
    });

    login(user);
    router.history.back();
  };

  return {
    submitHandler,
    isPending,
    registerError,
    formErrors,
    register,
    isSubmitting,
    password,
  };
};

export default useRegisterForm;
