import { Button, Input } from '@shadcn';
import { PasswordInput } from '@entities/auth';
import { useRegisterForm } from '@features/auth/model';

const RegisterForm = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
  const {
    submitHandler,
    isPending,
    formErrors,
    serverError,
    isSubmitting,
    password,
    register,
  } = useRegisterForm();

  return (
    <form
      onSubmit={submitHandler}
      className="bg-card mx-auto flex w-full max-w-sm flex-col gap-4 rounded-xl border p-6 shadow-sm"
      noValidate
    >
      <h1 className="text-center text-xl font-semibold tracking-tight">
        Create account
      </h1>

      {serverError && (
        <p className="text-destructive text-sm" role="alert">
          {serverError.message || 'Failed to register'}
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
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          })}
        />
        {formErrors.username && (
          <p className="text-destructive text-xs" role="alert">
            {formErrors.username.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <PasswordInput
          label="New password"
          id="password"
          autoComplete="new-password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password must be at least 3 characters',
            },
          })}
        />
        {formErrors.password && (
          <p className="text-destructive text-xs" role="alert">
            {formErrors.password.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <PasswordInput
          label="Repeat new password"
          id="repeat-password"
          autoComplete="repeat-new-password"
          {...register('repeatPassword', {
            required: 'Please repeat the password',
            validate: (value) => value === password || "Passwords don't match",
          })}
        />
        {formErrors.repeatPassword && (
          <p className="text-destructive text-xs" role="alert">
            {formErrors.repeatPassword.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Gender</span>
        <div className="flex gap-3 text-sm">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="male"
              {...register('gender', {
                required: 'Please select your gender',
              })}
              className="h-3 w-3"
            />
            <span>Male</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="female"
              {...register('gender', {
                required: 'Please select your gender',
              })}
              className="h-3 w-3"
            />
            <span>Female</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="other"
              {...register('gender', {
                required: 'Please select your gender',
              })}
              className="h-3 w-3"
            />
            <span>Other</span>
          </label>
        </div>
        {formErrors.gender && (
          <p className="text-destructive text-xs" role="alert">
            {formErrors.gender.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="source">
          How did you hear about us?
        </label>
        <select
          id="source"
          className="bg-background border-border rounded-md border px-2 py-1 text-sm"
          {...register('source', {
            required: 'Please select an option',
          })}
        >
          <option value="">Select an option</option>
          <option value="search">Search engine</option>
          <option value="friend">From a friend</option>
          <option value="social">Social media</option>
          <option value="other">Other</option>
        </select>
        {formErrors.source && (
          <p className="text-destructive text-xs" role="alert">
            {formErrors.source.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Date of birth</span>
        <div className="flex gap-2">
          <select
            className="bg-background border-border w-1/3 rounded-md border px-2 py-1 text-sm"
            {...register('birthDay', {
              required: 'Day is required',
            })}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={String(day)}>
                {day}
              </option>
            ))}
          </select>

          <select
            className="bg-background border-border w-1/3 rounded-md border px-2 py-1 text-sm"
            {...register('birthMonth', {
              required: 'Month is required',
            })}
          >
            <option value="">Month</option>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>

          <select
            className="bg-background border-border w-1/3 rounded-md border px-2 py-1 text-sm"
            {...register('birthYear', {
              required: 'Year is required',
            })}
          >
            <option value="">Year</option>
            {Array.from({ length: 80 }, (_, i) => 2025 - i).map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {(formErrors.birthDay ||
          formErrors.birthMonth ||
          formErrors.birthYear) && (
          <p className="text-destructive text-xs" role="alert">
            {formErrors.birthDay?.message ||
              formErrors.birthMonth?.message ||
              formErrors.birthYear?.message}
          </p>
        )}
      </div>

      <label className="mt-1 flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          className="h-3 w-3"
          {...register('newsletter')}
        />
        <span>Subscribe to our newsletter</span>
      </label>

      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          className="h-3 w-3"
          {...register('acceptTerms', {
            validate: (value) =>
              value || 'You must accept the terms to continue',
          })}
        />
        <span>I accept the terms and conditions</span>
      </label>
      {formErrors.acceptTerms && (
        <p className="text-destructive text-xs" role="alert">
          {formErrors.acceptTerms.message}
        </p>
      )}

      <Button
        type="submit"
        className="mt-2 w-full cursor-pointer"
        disabled={isPending || isSubmitting}
      >
        {isPending || isSubmitting ? 'Creating…' : 'Sign up'}
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
