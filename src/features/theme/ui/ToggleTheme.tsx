import { Monitor, Moon, Sun } from 'lucide-react';

import { ThemeType } from '@features/theme/model';

type ToggleThemeProps = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ToggleTheme = ({ theme, setTheme }: ToggleThemeProps) => {
  const isLight = theme === 'light';
  const isDark = theme === 'dark';
  const isSystem = theme === 'system';

  return (
    <div
      className="bg-card flex h-10 w-32 items-center justify-between rounded-lg border p-1 shadow-sm"
      role="radiogroup"
      aria-label="Color theme"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        role="radio"
        aria-checked={isLight}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs transition ${
          isLight
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-muted'
        }`}
        title="Light theme"
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        role="radio"
        aria-checked={isDark}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs transition ${
          isDark
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-muted'
        }`}
        title="Dark theme"
      >
        <Moon className="h-4 w-4" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => setTheme('system')}
        role="radio"
        aria-checked={isSystem}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xs transition ${
          isSystem
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-muted'
        }`}
        title="System theme"
      >
        <Monitor className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ToggleTheme;
