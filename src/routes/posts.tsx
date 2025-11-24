import { createFileRoute } from '@tanstack/react-router';

import Posts from '@pages/Posts';

export const Route = createFileRoute('/posts')({
  component: Posts,
});
