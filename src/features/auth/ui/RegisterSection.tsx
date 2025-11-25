import { RegisterForm } from '@entities/auth';
import { AuthMode, useRegisterForm } from '@features/auth/model';

const RegisterSection = ({
  setMode,
}: {
  setMode: (mode: AuthMode) => void;
}) => {
  const {
    submitHandler,
    isPending,
    formErrors,
    registerError,
    isSubmitting,
    password,
    register,
  } = useRegisterForm();

  return (
    <RegisterForm
      submitHandler={submitHandler}
      isSubmitting={isSubmitting}
      isPending={isPending}
      serverError={registerError}
      errors={formErrors}
      password={password}
      register={register}
      onSwitchToLogin={() => setMode('login')}
    />
  );
};

export default RegisterSection;
