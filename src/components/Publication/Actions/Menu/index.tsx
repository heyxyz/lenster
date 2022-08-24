import { NextLink } from '@components/Shared/Navbar/MenuItems';
import { LensterPublication } from '@generated/lenstertypes';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { Mixpanel } from '@lib/mixpanel';
import clsx from 'clsx';
import { FC, Fragment } from 'react';
import { useAppStore } from 'src/store/app';
import { PUBLICATION } from 'src/tracking';

import Delete from './Delete';
import Embed from './Embed';
import Permalink from './Permalink';

interface Props {
  publication: LensterPublication;
}

const PublicationMenu: FC<Props> = ({ publication }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  return (
    <Menu as="div">
      {({ open }) => (
        <>
          <Menu.Button
            className="p-1.5 rounded-full hover:bg-gray-300 hover:bg-opacity-20"
            onClick={() => {
              Mixpanel.track(PUBLICATION.MORE);
            }}
            aria-label="More"
          >
            <EllipsisHorizontalIcon className="w-[15px] sm:w-[18px] text-gray-500 dark:text-gray-300" />
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute py-1 w-max bg-white rounded-xl border shadow-sm dark:bg-gray-900 focus:outline-none z-[5] dark:border-gray-700/80"
            >
              {currentProfile?.id === publication?.profile?.id ? (
                <Delete publication={publication} />
              ) : (
                <Menu.Item
                  as={NextLink}
                  href={`/report/${publication?.id}`}
                  className={({ active }: { active: boolean }) =>
                    clsx(
                      { 'dropdown-active': active },
                      'block px-4 py-1.5 text-sm text-red-500 m-2 rounded-lg cursor-pointer'
                    )
                  }
                >
                  <div className="flex items-center space-x-2">
                    <ShieldExclamationIcon className="w-4 h-4" />
                    <div>Report Post</div>
                  </div>
                </Menu.Item>
              )}
              <Embed publication={publication} />
              <Permalink publication={publication} />
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default PublicationMenu;
