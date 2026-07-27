import type { Response } from 'express';

export function initSse(res: Response): void {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
}

export function sendSseEvent(res: Response, event: string, data: unknown): void {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

export function sendSseDone(res: Response): void {
  sendSseEvent(res, 'done', {});
  res.end();
}

export function sendSseError(res: Response, message: string): void {
  sendSseEvent(res, 'error', { message });
  res.end();
}

export function startHeartbeat(res: Response, intervalMs = 15000): NodeJS.Timeout {
  return setInterval(() => {
    try { res.write(': heartbeat\n\n'); } catch { /* client gone */ }
  }, intervalMs);
}
