import { useState } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import NotFound from '@pages/NotFound';
import { Header } from '@entities/header';
import { Footer, SideNav } from '@entities/layout';
import { useTheme } from '@features/theme/model';

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
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
      <main className="bg-sky-star bg-sky-star-blur flex grow justify-center py-13">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
