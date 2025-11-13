import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToggleTheme from '../ToggleTheme';

describe('ToggleTheme', () => {
  it('marks only light button as checked when theme="light"', () => {
    const setTheme = jest.fn();

    render(<ToggleTheme theme="light" setTheme={setTheme} />);

    const lightButton = screen.getByRole('radio', { name: /light theme/i });
    const darkButton = screen.getByRole('radio', { name: /dark theme/i });
    const systemButton = screen.getByRole('radio', { name: /system theme/i });

    expect(lightButton).toHaveAttribute('aria-checked', 'true');
    expect(darkButton).toHaveAttribute('aria-checked', 'false');
    expect(systemButton).toHaveAttribute('aria-checked', 'false');
  });

  it('calls setTheme("dark") when dark button is clicked', async () => {
    const user = userEvent.setup();
    const setTheme = jest.fn();

    render(<ToggleTheme theme="light" setTheme={setTheme} />);

    const darkButton = screen.getByRole('radio', { name: /dark theme/i });

    await user.click(darkButton);

    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('matches snapshot for light theme', () => {
    const setTheme = jest.fn();

    const { container } = render(
      <ToggleTheme theme="light" setTheme={setTheme} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
