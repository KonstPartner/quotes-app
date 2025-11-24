import { RegisterForm } from '@entities/auth';
import { AuthMode, useRegisterForm } from '@features/auth/model';

const RegisterSection = ({
  setMode,
}: {
  setMode: (theme: AuthMode) => void;
}) => {
  const { handleRegister, isPending, passwordError, error } = useRegisterForm();

  return (
    <RegisterForm
      handleRegister={handleRegister}
      isPending={isPending}
      error={passwordError ? new Error(passwordError) : error}
      onSwitchToLogin={() => setMode('login')}
    />
  );
};

export default RegisterSection;
