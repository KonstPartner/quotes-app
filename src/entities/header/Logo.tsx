import { Link } from '@tanstack/react-router';
import { Quote } from 'lucide-react';

const Logo = () => {
  return (
    <Link
      to="/"
      aria-label="Go to home page"
      className="flex items-center gap-2"
    >
      <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-md">
        <Quote className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-primary text-lg font-semibold">Quotes App</span>
    </Link>
  );
};

export default Logo;
