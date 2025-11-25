import { BaseSyntheticEvent } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Button, Input } from '@shadcn';
import { PasswordInput } from '@entities/auth';
import { LoginFormValues } from '@features/auth/model';

type LoginFormProps = {
  submitHandler: (e?: BaseSyntheticEvent) => Promise<void>;
  onSwitchToRegister: () => void;
  isPending: boolean;
  serverError: Error | null;
  errors: FieldErrors<LoginFormValues>;
  register: UseFormRegister<LoginFormValues>;
  isSubmitting: boolean;
};

const LoginForm = ({
  onSwitchToRegister,
  submitHandler,
  isPending,
  errors,
  serverError,
  register,
  isSubmitting,
}: LoginFormProps) => {
  return (
    <form
      onSubmit={submitHandler}
      className="bg-card mx-auto flex w-full max-w-sm flex-col gap-4 rounded-xl border p-6 shadow-sm"
    >
      <h1 className="text-center text-xl font-semibold tracking-tight">
        Sign in
      </h1>

      {serverError && (
        <p className="text-destructive text-sm" role="alert">
          {serverError.message || 'Failed to login'}
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="username">
          Username
        </label>
        <Input
          id="username"
          placeholder="Enter username"
          autoComplete="username"
          {...register('username', {
            required: 'Username is required',
          })}
        />
        {errors.username && (
          <p className="text-destructive text-xs" role="alert">
            {errors.username.message}
          </p>
        )}
      </div>

      <PasswordInput
        label="Password"
        id="password"
        autoComplete="current-password"
        {...register('password', {
          required: 'Password is required',
        })}
      />
      {errors.password && (
        <p className="text-destructive text-xs" role="alert">
          {errors.password.message}
        </p>
      )}

      <Button
        type="submit"
        className="mt-2 w-full cursor-pointer"
        disabled={isPending || isSubmitting}
      >
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>

      <p className="text-muted-foreground mt-2 text-center text-xs">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary cursor-pointer underline-offset-4 hover:underline"
        >
          Create one
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
