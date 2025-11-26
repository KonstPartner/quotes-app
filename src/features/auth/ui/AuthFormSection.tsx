import { useState } from 'react';

import { AuthMode } from '@features/auth/model';
import { LoginForm, RegisterForm } from '@features/auth/ui';

const AuthFormSection = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <section>
      {mode === 'login' ? (
        <LoginForm onSwitchToRegister={() => setMode('register')} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setMode('login')} />
      )}
    </section>
  );
};

export default AuthFormSection;
