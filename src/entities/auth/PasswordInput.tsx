import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn, Input } from '@shadcn';

const PasswordInput = ({
  id,
  name,
  label,
  autoComplete,
  required,
  defaultValue,
}: {
  id: string;
  name: string;
  label: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <Input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          required={required}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          className={cn('pr-10')}
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-2 flex cursor-pointer items-center"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
