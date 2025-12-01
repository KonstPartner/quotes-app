import { useState } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import NotFound from '@pages/NotFound';
import { Header } from '@entities/header';
import { Footer, SideNav } from '@entities/layout';
import { useTheme } from '@features/theme/model';

const RootLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-sky-star flex min-h-screen flex-col gap-13">
      <Header
        theme={theme}
        setTheme={setTheme}
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      />

      <SideNav
        isOpen={isOpenSidebar}
        setIsOpen={setIsOpenSidebar}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="flex grow justify-center">
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
