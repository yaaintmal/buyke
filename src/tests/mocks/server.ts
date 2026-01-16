import * as mswNode from 'msw/node';
import { handlers } from './handlers';

const setupServer = (mswNode as any).setupServer as typeof mswNode.setupServer;
export const server = setupServer(...handlers);
