import { createRootRoute, Outlet } from '@tanstack/react-router';

import NotFound from '@pages/NotFound';

const RootLayout = () => {
  return (
    <div>
      <header></header>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
