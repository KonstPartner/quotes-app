import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@shadcn';

const RedirectSection = (
  props: Record<'title' | 'description' | 'button' | 'to', string> & {
    className?: string;
  }
) => {
  const { title, description, button, to, className } = props;

  return (
    <section
      className={twMerge(
        clsx(
          'border-border bg-card/80 flex w-full flex-col items-center justify-between gap-4 rounded-xl border p-5 shadow-sm sm:flex-row sm:text-left',
          className
        )
      )}
    >
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <Link to={to}>
        <Button type="button">
          {button}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
};

export default RedirectSection;
