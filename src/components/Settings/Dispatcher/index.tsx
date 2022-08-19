import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout';
import { Card, CardBody } from '@components/UI/Card';
import Seo from '@components/utils/Seo';
import { Mixpanel } from '@lib/mixpanel';
import React, { FC, useEffect } from 'react';
import { APP_NAME } from 'src/constants';
import Custom404 from 'src/pages/404';
import { useAppPersistStore, useAppStore } from 'src/store/app';
import { PAGEVIEW } from 'src/tracking';

import Sidebar from '../Sidebar';
import ToggleDispatcher from './ToggleDispatcher';

const DispatcherSettings: FC = () => {
  const canUseRelay = useAppStore((state) => state.canUseRelay);
  const currentUser = useAppPersistStore((state) => state.currentUser);

  useEffect(() => {
    Mixpanel.track(PAGEVIEW.SETTINGS.DISPATCHER);
  }, []);

  if (!currentUser) {
    return <Custom404 />;
  }

  return (
    <GridLayout>
      <Seo title={`Dispatcher • ${APP_NAME}`} />
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody className="space-y-2 linkify">
            <div className="flex items-center space-x-2">
              <div className="text-lg font-bold">{canUseRelay ? 'Disable' : 'Enable'} dispatcher</div>
            </div>
            <div>
              We suggest you to enable dispatcher so you don't want to sign all your transactions in{' '}
              {APP_NAME}.
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <ToggleDispatcher buttonVariant="primary" />
            </div>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default DispatcherSettings;
