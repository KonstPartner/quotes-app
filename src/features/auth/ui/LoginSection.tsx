import { LoginForm } from '@entities/auth';
import { AuthMode, useLoginForm } from '@features/auth/model';

const LoginSection = ({ setMode }: { setMode: (theme: AuthMode) => void }) => {
  const {
    submitHandler,
    isPending,
    formErrors,
    loginError,
    register,
    isSubmitting,
  } = useLoginForm();

  return (
    <LoginForm
      isSubmitting={isSubmitting}
      submitHandler={submitHandler}
      isPending={isPending}
      errors={formErrors}
      serverError={loginError}
      register={register}
      onSwitchToRegister={() => setMode('register')}
    />
  );
};

export default LoginSection;
