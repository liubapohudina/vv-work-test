import { ChevronDown } from 'lucide-react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  languages,
  supportedLanguages,
  type Language,
} from '@/i18n/config';

type LanguageSwitcherProps = {
  tone?: 'default' | 'onDark';
};

export const LanguageSwitcher = ({
  tone = 'default',
}: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage: Language = isSupportedLanguage(lang)
    ? lang
    : DEFAULT_LANGUAGE;

  const handleLanguageChange = async (language: Language) => {
    if (language === currentLanguage) {
      setIsOpen(false);
      return;
    }

    await i18n.changeLanguage(language);

    localStorage.setItem('vv-work-language', language);

    document.documentElement.lang = language;

    const segments = location.pathname.split('/').filter(Boolean);

    if (segments[0] && isSupportedLanguage(segments[0])) {
      segments[0] = language;
    } else {
      segments.unshift(language);
    }

    navigate(`/${segments.join('/')}${location.search}${location.hash}`);

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`
          flex items-center gap-2
          rounded-full
          px-3 py-2
          text-sm font-semibold
          transition-colors duration-200

          ${
            tone === 'onDark'
              ? `
                text-white/80
                hover:bg-white/[0.06]
                hover:text-white
              `
              : `
                text-[var(--color-text-secondary)]
                hover:bg-[var(--color-card)]
                hover:text-[var(--color-text-primary)]
              `
          }
        `}
      >
        {languages[currentLanguage].label}

        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`
            transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="
            absolute right-0 top-full
            z-50 mt-2
            min-w-28
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            p-1
            shadow-[var(--shadow-card)]
          "
        >
          {supportedLanguages.map((language) => {
            const isActive = currentLanguage === language;

            return (
              <button
                key={language}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => void handleLanguageChange(language)}
                className={`
                  w-full
                  rounded-lg
                  px-3 py-2
                  text-left
                  text-sm
                  font-medium
                  transition-colors duration-200

                  ${
                    isActive
                      ? `
                        bg-[rgba(34,204,86,0.08)]
                        text-[var(--color-primary)]
                      `
                      : `
                        text-[var(--color-text-primary)]
                        hover:bg-[var(--color-card)]
                      `
                  }
                `}
              >
                {languages[language].label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
