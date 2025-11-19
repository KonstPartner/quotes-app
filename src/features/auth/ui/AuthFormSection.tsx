import { LoginForm, RegisterForm } from '@entities/auth';
import { useAuthFormSection } from '@features/auth/model';

const AuthFormSection = () => {
  const {
    mode,
    handleLogin,
    isLoginPending,
    loginError,
    setMode,
    handleRegister,
    isRegisterPending,
    registerError,
    passwordError,
  } = useAuthFormSection();

  return (
    <section>
      {mode === 'login' ? (
        <LoginForm
          handleLogin={handleLogin}
          isPending={isLoginPending}
          error={loginError}
          onSwitchToRegister={() => setMode('register')}
        />
      ) : (
        <RegisterForm
          handleRegister={handleRegister}
          isPending={isRegisterPending}
          error={passwordError ? new Error(passwordError) : registerError}
          onSwitchToLogin={() => setMode('login')}
        />
      )}
    </section>
  );
};

export default AuthFormSection;
