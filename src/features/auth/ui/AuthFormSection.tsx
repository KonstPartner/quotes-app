import { useState } from 'react';

import { AuthMode } from '@features/auth/model';
import { LoginSection, RegisterSection } from '@features/auth/ui';

const AuthFormSection = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <section>
      {mode === 'login' ? (
        <LoginSection setMode={setMode} />
      ) : (
        <RegisterSection setMode={setMode} />
      )}
    </section>
  );
};

export default AuthFormSection;
