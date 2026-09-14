import en from './translations/en.json';
import uk from './translations/uk.json';

export const resources = {
  uk: {
    translation: uk,
  },
  en: {
    translation: en,
  },
} as const;

export const languages = {
  uk: {
    label: 'UA',
    name: 'Українська',
  },
  en: {
    label: 'EN',
    name: 'English',
  },
} as const;

export type Language = keyof typeof languages;

export const DEFAULT_LANGUAGE: Language = 'uk';

export const supportedLanguages = Object.keys(languages) as Language[];

export const isSupportedLanguage = (
  value: string | undefined,
): value is Language => {
  return Boolean(value && supportedLanguages.includes(value as Language));
};
