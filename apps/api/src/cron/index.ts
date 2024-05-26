import { LENS_NETWORK } from '@hey/data/constants';
import logger from '@hey/helpers/logger';
import dotenv from 'dotenv';
import cron from 'node-cron';

import cleanClickhouse from './cleanClickhouse';
import cleanDraftPublications from './cleanDraftPublications';
import cleanEmailTokens from './cleanEmailTokens';
import cleanPreferences from './cleanPreferences';
import deleteLensPublications from './deleteLensPublications';
import replicateGardeners from './replicateGardeners';
import replicateLensPublications from './replicateLensPublications';

dotenv.config({ override: true });

const main = () => {
  if (LENS_NETWORK !== 'mainnet') {
    return;
  }

  logger.info('Cron jobs are started...');

  cron.schedule('*/5 * * * *', async () => {
    await replicateGardeners();
    return;
  });

  cron.schedule('*/10 * * * * *', async () => {
    await deleteLensPublications();
    return;
  });

  cron.schedule('*/1 * * * *', async () => {
    await replicateLensPublications();
    return;
  });

  cron.schedule('*/5 * * * *', async () => {
    await cleanClickhouse();
    return;
  });

  cron.schedule('*/5 * * * *', async () => {
    await cleanDraftPublications();
    return;
  });

  cron.schedule('*/5 * * * *', async () => {
    await cleanEmailTokens();
    return;
  });

  cron.schedule('*/5 * * * *', async () => {
    await cleanPreferences();
    return;
  });
};

main();