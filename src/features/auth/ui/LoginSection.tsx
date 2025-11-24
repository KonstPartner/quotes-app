import { LoginForm } from '@entities/auth';
import { AuthMode, useLoginForm } from '@features/auth/model';

const LoginSection = ({ setMode }: { setMode: (theme: AuthMode) => void }) => {
  const { handleLogin, isPending, error } = useLoginForm();

  return (
    <LoginForm
      handleLogin={handleLogin}
      isPending={isPending}
      error={error}
      onSwitchToRegister={() => setMode('register')}
    />
  );
};

export default LoginSection;
