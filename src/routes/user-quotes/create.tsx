import { createFileRoute } from '@tanstack/react-router';

import CreateQuote from '@pages/CreateQuote';

export const Route = createFileRoute('/user-quotes/create')({
  component: CreateQuote,
});
