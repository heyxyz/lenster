import { Errors } from '@lenster/data/errors';
import response from '@lenster/lib/response';
import { createCors, error, Router, status } from 'itty-router';

import hasUsedLenster from './handlers/hasUsedLenster';
import streaksCalendar from './handlers/streaksCalendar';
import streaksList from './handlers/streaksList';
import buildRequest from './helpers/buildRequest';
import type { Env, WorkerRequest } from './types';

const { preflight, corsify } = createCors({
  origins: ['*'],
  methods: ['HEAD', 'GET', 'POST']
});

const router = Router();

router
  .all('*', preflight)
  .head('*', () => status(200))
  .get('/', (request: WorkerRequest) =>
    response({
      message: 'gm, to achievements service 👋',
      version: request.env.RELEASE ?? 'unknown'
    })
  )
  .get('/hasUsedLenster/:id', hasUsedLenster)
  .get('/streaks/:id', streaksCalendar)
  .get('/streaks/:id/:date', streaksList)
  .all('*', () => error(404));

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const incomingRequest = buildRequest(request, env, ctx);

    return await router
      .handle(incomingRequest)
      .then(corsify)
      .catch(() => {
        return error(500, Errors.InternalServerError);
      });
  }
};
