import { createFileRoute } from '@tanstack/react-router';

import UserQuotes from '@pages/UserQuotes';

export const Route = createFileRoute('/user-quotes/')({
  component: UserQuotes,
});
