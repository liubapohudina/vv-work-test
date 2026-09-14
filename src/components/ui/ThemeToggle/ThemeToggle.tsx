import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'vv-work-theme';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    const initialTheme: Theme =
      savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';

    setTheme(initialTheme);

    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);

    localStorage.setItem(STORAGE_KEY, nextTheme);

    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'
      }
      className="
        relative
        flex h-[30px] w-[54px]
        items-center
        rounded-full
        border border-white/10
        bg-white/5
        p-[3px]
        transition-colors
        hover:bg-white/10

        max-[480px]:w-[50px]
      "
    >
      <span
        className={`
          grid h-[22px] w-[22px]
          place-items-center
          rounded-full
          text-[#07110d]
          transition-all
          duration-300

          max-[480px]:h-5
          max-[480px]:w-5

          ${
            theme === 'dark'
              ? 'translate-x-0 bg-[#b7d7ff]'
              : `
                translate-x-6
                bg-[#eaff86]
                max-[480px]:translate-x-[22px]
              `
          }
        `}
      >
        {theme === 'dark' ? (
          <Moon size={14} aria-hidden="true" />
        ) : (
          <Sun size={14} aria-hidden="true" />
        )}
      </span>
    </button>
  );
};
