import chalk from 'chalk';

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(
      chalk.gray(`[${new Date().toISOString()}]`),
      chalk.blue('[INFO]'),
      message,
      ...args,
    );
  },
  success: (message: string, ...args: unknown[]) => {
    console.log(chalk.gray(`[${new Date().toISOString()}]`), chalk.green('[OK]'), message, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(
      chalk.gray(`[${new Date().toISOString()}]`),
      chalk.yellow('[WARN]'),
      message,
      ...args,
    );
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(
      chalk.gray(`[${new Date().toISOString()}]`),
      chalk.red('[ERROR]'),
      message,
      ...args,
    );
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.DEBUG || process.env.NODE_ENV !== 'production') {
      console.debug(
        chalk.gray(`[${new Date().toISOString()}]`),
        chalk.magenta('[DEBUG]'),
        message,
        ...args,
      );
    }
  },
};
