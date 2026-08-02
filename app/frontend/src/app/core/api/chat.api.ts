import { inject, Injectable, NgZone } from '@angular/core';
import { ChatMode } from '../models/chat.model';

export interface ChatRequest {
  message: string;
  modelId?: string;
  threadId?: string;
  mode?: ChatMode;
  stream?: boolean;
  context?: {
    subjectId?: string;
    problemSlug?: string;
    filters?: Record<string, unknown>;
  };
}

@Injectable({ providedIn: 'root' })
export class ChatApi {
  private ngZone = inject(NgZone);

  sendStream(body: ChatRequest, onEvent: (event: string, data: any) => void, signal?: AbortSignal): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...body, stream: true }),
          signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: { message: 'Request failed' } }));
          reject(new Error(err.error?.message ?? 'Chat request failed'));
          return;
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let currentEvent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (line.startsWith('event: ')) {
              currentEvent = line.slice(7).trim();
            } else if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                this.ngZone.run(() => onEvent(currentEvent, data));
                if (currentEvent === 'done' || currentEvent === 'error') {
                  resolve();
                  return;
                }
              } catch { /* skip malformed */ }
            }
          }
        }
        resolve();
      } catch (err: any) {
        if (err.name === 'AbortError') {
          resolve();
        } else {
          reject(err);
        }
      }
    });
  }

  async sendSync(body: ChatRequest): Promise<any> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, stream: false }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: { message: 'Request failed' } }));
      throw new Error(err.error?.message ?? 'Chat request failed');
    }
    return res.json();
  }
}
