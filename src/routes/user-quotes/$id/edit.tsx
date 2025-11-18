import { createFileRoute } from '@tanstack/react-router';

import EditQuote from '@pages/EditQuote';

export const Route = createFileRoute('/user-quotes/$id/edit')({
  component: EditQuote,
});
