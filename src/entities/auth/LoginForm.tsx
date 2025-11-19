import { FormEvent } from 'react';

import { Button, Input } from '@shadcn';
import { PasswordInput } from '@entities/auth';

const LoginForm = ({
  onSwitchToRegister,
  handleLogin,
  isPending,
  error,
}: {
  onSwitchToRegister: () => void;
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<void> | void;
  isPending: boolean;
  error: Error | null;
}) => {
  return (
    <form
      onSubmit={handleLogin}
      className="bg-card mx-auto flex w-full max-w-sm flex-col gap-4 rounded-xl border p-6 shadow-sm"
    >
      <h1 className="text-center text-xl font-semibold tracking-tight">
        Sign in
      </h1>

      {error && (
        <p className="text-destructive text-sm" role="alert">
          {error.message || 'Failed to login'}
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
          label="Password"
          id="password"
          name="password"
          autoComplete="current-password"
          required
        />
      </div>

      <Button type="submit" className="mt-2 w-full">
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>

      <p className="text-muted-foreground mt-2 text-center text-xs">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary underline-offset-4 hover:underline"
        >
          Create one
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
