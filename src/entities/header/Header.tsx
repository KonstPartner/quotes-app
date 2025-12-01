import { Dispatch, SetStateAction } from 'react';
import { Menu } from 'lucide-react';

import { Logo, NavBar } from '@entities/header';
import { AuthButton } from '@features/auth/ui';
import { ThemeType } from '@features/theme/model';
import { ToggleTheme } from '@features/theme/ui';

type HeaderProps = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isOpenSidebar: boolean;
  setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
};

const Header = ({
  theme,
  setTheme,
  isOpenSidebar,
  setIsOpenSidebar,
}: HeaderProps) => {
  return (
    <header
      className="bg-background/60 sticky top-0 z-40 flex h-16 justify-center border-b backdrop-blur-md"
      role="banner"
    >
      <div className="flex w-full items-center justify-between gap-4 p-5">
        <Logo />

        <div className="hidden items-center gap-5 lg:flex lg:gap-8">
          <NavBar />
          <ToggleTheme theme={theme} setTheme={setTheme} />
          <AuthButton />
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            aria-label={
              isOpenSidebar ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={isOpenSidebar}
            aria-haspopup="dialog"
            aria-controls="mobile-nav"
            onClick={() => setIsOpenSidebar((prev) => !prev)}
            className="border-border text-foreground hover:bg-muted flex cursor-pointer items-center justify-center rounded-md"
          >
            <Menu className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
