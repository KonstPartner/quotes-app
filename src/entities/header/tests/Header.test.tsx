import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Header } from '@entities/header';
import type { ThemeType } from '@features/theme/model';

jest.mock('@tanstack/react-router', () => {
  const actual = jest.requireActual('@tanstack/react-router');
  return {
    ...actual,
    Link: () => <></>,
  };
});

jest.mock('@features/auth/ui/AuthButton', () => ({
  __esModule: true,
  default: () => <button>Auth</button>,
}));

describe('Header', () => {
  const setTheme = jest.fn();
  const setIsOpen = jest.fn();
  const { getByRole } = screen;
  const renderHeader = (theme: ThemeType = 'light') => {
    const utils = render(
      <Header
        theme={theme}
        setTheme={setTheme}
        isOpenSidebar={false}
        setIsOpenSidebar={setIsOpen}
      />
    );

    return { setTheme, setIsOpen, ...utils };
  };

  it('renders banner, nav and theme toggle', () => {
    renderHeader();

    const banner = getByRole('banner');

    expect(banner).toBeInTheDocument();

    const themeToggle = getByRole('radiogroup', {
      name: /color theme/i,
    });

    expect(themeToggle).toBeInTheDocument();

    const burgerButton = getByRole('button', {
      name: /open navigation menu/i,
    });

    expect(burgerButton).toBeInTheDocument();
  });

  it('calls setIsOpen when burger is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Header
        theme="light"
        setTheme={setTheme}
        isOpenSidebar={false}
        setIsOpenSidebar={setIsOpen}
      />
    );

    const burgerButton = getByRole('button', {
      name: /open navigation menu/i,
    });

    await user.click(burgerButton);

    expect(setIsOpen).toHaveBeenCalledTimes(1);
    expect(typeof setIsOpen.mock.calls[0][0]).toBe('function');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Header
        theme="light"
        setTheme={setTheme}
        isOpenSidebar={false}
        setIsOpenSidebar={setIsOpen}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
