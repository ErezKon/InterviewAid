import { LogColors } from './log-colors.util.js';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: LogColors.BRIGHT_BLACK,
  info: LogColors.CYAN,
  warn: LogColors.YELLOW,
  error: LogColors.RED,
};

function fmt(level: LogLevel, tag: string, message: string, ...args: unknown[]): string {
  const ts = new Date().toISOString().slice(11, 23);
  const c = LEVEL_COLORS[level];
  return `${LogColors.BRIGHT_BLACK}${ts}${LogColors.RESET} ${c}${level.toUpperCase().padEnd(5)}${LogColors.RESET} ${LogColors.MAGENTA}[${tag}]${LogColors.RESET} ${message}`;
}

export function createLogger(tag: string) {
  return {
    debug: (msg: string, ...args: unknown[]) => console.debug(fmt('debug', tag, msg), ...args),
    info: (msg: string, ...args: unknown[]) => console.info(fmt('info', tag, msg), ...args),
    warn: (msg: string, ...args: unknown[]) => console.warn(fmt('warn', tag, msg), ...args),
    error: (msg: string, ...args: unknown[]) => console.error(fmt('error', tag, msg), ...args),
  };
}

export const log = createLogger('app');
