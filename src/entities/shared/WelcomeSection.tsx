import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const WelcomeSection = (
  props: Record<'subtitle' | 'title' | 'description', string> & {
    className?: string;
  }
) => {
  const { subtitle, title, description, className } = props;

  return (
    <section className={twMerge(clsx('space-y-3 text-center', className))}>
      <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">
        {subtitle}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base">
        {description}
      </p>
    </section>
  );
};

export default WelcomeSection;
