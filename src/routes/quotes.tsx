import { createFileRoute } from '@tanstack/react-router';

import Quotes from '@pages/Quotes';

export const Route = createFileRoute('/quotes')({
  component: Quotes,
});
