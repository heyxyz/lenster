import { Menu } from '@headlessui/react';
import { GlobeAltIcon } from '@heroicons/react/outline';
import { FeatureFlag } from '@lenster/data/feature-flags';
import { Localstorage } from '@lenster/data/storage';
import { MISCELLANEOUS } from '@lenster/data/tracking';
import isFeatureEnabled from '@lenster/lib/isFeatureEnabled';
import { Leafwatch } from '@lib/leafwatch';
import { useLingui } from '@lingui/react';
import clsx from 'clsx';
import { For } from 'million/react';
import type { FC } from 'react';
import { useCallback } from 'react';
import { SUPPORTED_LOCALES } from 'src/i18n';

import MenuTransition from '../MenuTransition';

const Locale: FC = () => {
  const { i18n } = useLingui();
  const isGatedLocalesEnabled = isFeatureEnabled(FeatureFlag.GatedLocales);
  const gatedLocales = ['fr', 'ru', 'ta'];
  const locales = Object.fromEntries(
    Object.entries(SUPPORTED_LOCALES).filter(([key]) =>
      isGatedLocalesEnabled ? true : !gatedLocales.includes(key)
    )
  );

  const setLanguage = useCallback((locale: string) => {
    localStorage.setItem(Localstorage.LocaleStore, locale);
    location.reload();
  }, []);

  return (
    <Menu as="span">
      <Menu.Button
        className="inline-flex items-center space-x-1"
        data-testid="locale-selector"
      >
        <GlobeAltIcon className="h-4 w-4" />
        <span>{locales[i18n.locale]}</span>
      </Menu.Button>
      <MenuTransition>
        <Menu.Items
          static
          className="absolute mt-2 rounded-xl border bg-white py-1 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          data-testid="locale-selector-menu"
        >
          <For each={Object.entries(locales)} as="div">
            {([localeCode, localeName]) => (
              <Menu.Item
                key={localeCode}
                as="div"
                onClick={() => {
                  setLanguage(localeCode);
                  Leafwatch.track(MISCELLANEOUS.SELECT_LOCALE, {
                    locale: localeCode
                  });
                  location.reload();
                }}
                className={({ active }: { active: boolean }) =>
                  clsx({ 'dropdown-active': active }, 'menu-item')
                }
              >
                {localeName}
              </Menu.Item>
            )}
          </For>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  );
};

export default Locale;
