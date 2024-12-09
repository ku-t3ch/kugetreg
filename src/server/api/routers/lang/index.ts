import { createTRPCRouter } from '@/server/api/trpc';

import getCurrentLang from './getCurrentLang.route';
import setLang from './setLang.route';

export const langRouter = createTRPCRouter({
  getCurrentLang,
  setLang,
});
