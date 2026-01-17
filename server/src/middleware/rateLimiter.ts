import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger';

import config from '../config';

const isTest = process.env.NODE_ENV === 'test';

// Window in ms, configurable via RATE_LIMIT_WINDOW_MS (defaults to 15 minutes)
const windowMs = isTest
  ? Number(process.env.RATE_LIMIT_WINDOW_MS || 1000)
  : Number(config.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
// Max requests for general and write operations. In test mode, small defaults are used or can be set via env.
const generalMax = isTest
  ? Number(process.env.RATE_LIMIT_MAX_TEST || 5)
  : Number(process.env.RATE_LIMIT_MAX || config.RATE_LIMIT_MAX || 200);
const strictMax = isTest
  ? Number(process.env.RATE_LIMIT_MAX_TEST_WRITE || 3)
  : Number(process.env.RATE_LIMIT_MAX_WRITE || config.RATE_LIMIT_MAX_WRITE || 60);

export const generalLimiter = rateLimit({
  windowMs,
  max: generalMax, // limit each IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded for IP ${req.ip} on ${req.method} ${req.originalUrl}`);
    res.status(429).json({ error: 'Too many requests, please try again later.' });
  },
});

export const strictLimiter = rateLimit({
  windowMs,
  max: strictMax, // stricter for write operations
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Strict rate limit exceeded for IP ${req.ip} on ${req.method} ${req.originalUrl}`);
    res.status(429).json({ error: 'Too many write requests, please try again later.' });
  },
});
