import { i18n } from '@lingui/core';
import { IS_PREVIEW, IS_PRODUCTION } from 'data/constants';
import dayjs from 'dayjs';
import { en } from 'make-plural/plurals';

export const supportedLocales: Record<string, string> = {
  en: 'English'
};

if (!IS_PRODUCTION || IS_PREVIEW) {
  supportedLocales.qaa = 'PseudoLanguage';
}

const defaultLocale = 'en';

i18n.loadLocaleData({
  en: { plurals: en },
  qaa: { plurals: en }
});

import('dayjs/locale/cs');

const localStorageKey = 'selectedLocale';

/**
 * set locale and dynamically import catalog
 * @param locale a supported locale string
 */
export async function setLocale(locale: string) {
  if (!supportedLocales.hasOwnProperty(locale)) {
    console.error('warning: unknown locale', locale);
    locale = defaultLocale;
  }
  localStorage.setItem(localStorageKey, JSON.stringify(locale));
  const { messages } = await import(`src/locales/${locale}/messages`);
  i18n.load(locale, messages);
  i18n.activate(locale);
  dayjs.locale(locale);
}

export const initLocale = () => {
  const storedValue = localStorage.getItem(localStorageKey);
  const locale = storedValue ? JSON.parse(storedValue) : defaultLocale;
  setLocale(locale);
};
