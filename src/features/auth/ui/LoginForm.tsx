import { Button, Input } from '@shadcn';
import { PasswordInput } from '@entities/auth';
import { useLoginForm } from '@features/auth/model';

const LoginForm = ({
  onSwitchToRegister,
}: {
  onSwitchToRegister: () => void;
}) => {
  const {
    submitHandler,
    isPending,
    formErrors,
    serverError,
    register,
    isSubmitting,
  } = useLoginForm();

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
        {formErrors.username && (
          <p className="text-destructive text-xs" role="alert">
            {formErrors.username.message}
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
      {formErrors.password && (
        <p className="text-destructive text-xs" role="alert">
          {formErrors.password.message}
        </p>
      )}

      <Button
        type="submit"
        className="mt-2 w-full cursor-pointer"
        disabled={isPending || isSubmitting}
      >
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>

      <div className="text-muted-foreground mt-2 flex justify-center gap-1 text-center text-xs">
        <span>Don&apos;t have an account?</span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary cursor-pointer underline-offset-4 hover:underline"
        >
          Create one
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
