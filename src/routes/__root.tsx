import { useState } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import NotFound from '@pages/NotFound';
import { Header } from '@entities/header';
import { SideNav } from '@entities/layout';
import { useTheme } from '@features/theme/model';

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Header
        theme={theme}
        setTheme={setTheme}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <SideNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        theme={theme}
        setTheme={setTheme}
      />

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
