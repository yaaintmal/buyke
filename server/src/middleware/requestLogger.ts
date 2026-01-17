import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    let msg = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    if (req.method === 'DELETE') {
      msg = chalk.red(msg);
    }

    if (res.statusCode >= 500) {
      logger.error(msg);
    } else if (res.statusCode >= 400) {
      logger.warn(msg);
    } else {
      logger.info(msg);
    }
  });

  next();
};
