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
  const renderHeader = (theme: ThemeType = 'light') => {
    const setTheme = jest.fn();
    const setIsOpen = jest.fn();

    const utils = render(
      <Header
        theme={theme}
        setTheme={setTheme}
        isOpen={false}
        setIsOpen={setIsOpen}
      />
    );

    return { setTheme, setIsOpen, ...utils };
  };

  it('renders banner, nav and theme toggle', () => {
    renderHeader();

    const banner = screen.getByRole('banner');

    expect(banner).toBeInTheDocument();

    const themeToggle = screen.getByRole('radiogroup', {
      name: /color theme/i,
    });

    expect(themeToggle).toBeInTheDocument();

    const burgerButton = screen.getByRole('button', {
      name: /open navigation menu/i,
    });

    expect(burgerButton).toBeInTheDocument();
  });

  it('calls setIsOpen when burger is clicked', async () => {
    const user = userEvent.setup();
    const setTheme = jest.fn();
    const setIsOpen = jest.fn();

    render(
      <Header
        theme="light"
        setTheme={setTheme}
        isOpen={false}
        setIsOpen={setIsOpen}
      />
    );

    const burgerButton = screen.getByRole('button', {
      name: /open navigation menu/i,
    });

    await user.click(burgerButton);

    expect(setIsOpen).toHaveBeenCalledTimes(1);
    expect(typeof setIsOpen.mock.calls[0][0]).toBe('function');
  });

  it('matches snapshot', () => {
    const setTheme = jest.fn();
    const setIsOpen = jest.fn();

    const { container } = render(
      <Header
        theme="light"
        setTheme={setTheme}
        isOpen={false}
        setIsOpen={setIsOpen}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
