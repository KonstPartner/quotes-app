import { Dispatch, SetStateAction } from 'react';

import { Burger, Logo, NavBar } from '@entities/header';
import AuthButton from '@features/auth/ui/AuthButton';
import { ThemeType } from '@features/theme/model';
import { ToggleTheme } from '@features/theme/ui';

const Header = ({
  theme,
  setTheme,
  isOpen,
  setIsOpen,
}: {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <header
      className="bg-background sticky top-0 z-40 flex h-16 justify-center border-b"
      role="banner"
    >
      <div className="container flex items-center justify-between gap-4">
        <Logo />

        <div className="hidden items-center gap-5 md:flex lg:gap-8">
          <NavBar />
          <ToggleTheme theme={theme} setTheme={setTheme} />
          <AuthButton />
        </div>

        <div className="md:hidden">
          <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
