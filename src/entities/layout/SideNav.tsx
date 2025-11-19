import clsx from 'clsx';
import { X } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

import { Logo, NavLink } from '@entities/header';
import AuthButton from '@features/auth/ui/AuthButton';
import { ThemeType } from '@features/theme/model';
import { ToggleTheme } from '@features/theme/ui';
import { NAV_LINKS } from '@constants';

const SideNav = ({
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
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <div
        className={clsx(
          'fixed inset-0 z-50 transition-opacity duration-300',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        <div
          className="absolute inset-0 h-dvh bg-black/40"
          onClick={closeMenu}
          aria-hidden="true"
        />

        <aside
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          className={clsx(
            'bg-background absolute top-0 right-0 flex h-dvh w-64 flex-col gap-3 border-l px-4 py-3 shadow-xl',
            'transition-transform duration-300 ease-out',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between border-b pb-3">
            <Logo />
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              className="hover:bg-muted inline-flex items-center justify-center rounded-md"
            >
              <X className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex-1 overflow-y-auto"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} label={label} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-border flex flex-col items-center justify-center gap-5 border-t pt-3">
            <ToggleTheme theme={theme} setTheme={setTheme} />
            <AuthButton />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SideNav;
