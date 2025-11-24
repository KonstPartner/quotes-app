import { FormEvent } from 'react';

import { Button, Input } from '@shadcn';
import { PasswordInput } from '@entities/auth';

const RegisterForm = ({
  handleRegister,
  onSwitchToLogin,
  isPending,
  error,
}: {
  onSwitchToLogin: () => void;
  handleRegister: (event: FormEvent<HTMLFormElement>) => Promise<void> | void;
  isPending: boolean;
  error: Error | null;
}) => {
  return (
    <form
      onSubmit={handleRegister}
      className="bg-card mx-auto flex w-full max-w-sm flex-col gap-4 rounded-xl border p-6 shadow-sm"
    >
      <h1 className="text-center text-xl font-semibold tracking-tight">
        Create account
      </h1>

      {error && (
        <p className="text-destructive text-sm" role="alert">
          {error?.message || 'Failed to register'}
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="username">
          Username
        </label>
        <Input id="username" name="username" autoComplete="username" required />
      </div>

      <div className="flex flex-col gap-1">
        <PasswordInput
          label="New password"
          id="password"
          name="password"
          autoComplete="new-password"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <PasswordInput
          label="Repeat new password"
          id="repeat-password"
          name="repeatPassword"
          autoComplete="repeat-new-password"
          required
        />
      </div>

      <Button type="submit" className="mt-2 w-full cursor-pointer">
        {isPending ? 'Creating…' : 'Sign up'}
      </Button>

      <p className="text-muted-foreground mt-2 text-center text-xs">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary cursor-pointer underline-offset-4 hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
