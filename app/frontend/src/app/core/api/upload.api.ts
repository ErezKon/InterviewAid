import { inject, Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UploadRequest {
  files: File[];
  type: 'material' | 'problem';
  title: string;
  agentic: boolean;
  mainSubject?: string;
  subSubject?: string;
  classification?: string;
  subClassification?: string;
  difficulty?: string;
}

export interface UploadResultItem {
  id: string;
  title: string;
  filePath: string;
}

export interface UploadResult {
  type: string;
  filesProcessed: number;
  items: UploadResultItem[];
  message: string;
}

@Injectable({ providedIn: 'root' })
export class UploadApi {
  private http = inject(HttpClient);
  private ngZone = inject(NgZone);

  upload(request: UploadRequest): Observable<UploadResult> {
    return this.http.post<{ data: UploadResult }>('/api/upload', buildFormData(request))
      .pipe(map(r => r.data));
  }

  sendStream(
    request: UploadRequest,
    onEvent: (event: string, data: any) => void,
    signal?: AbortSignal,
  ): Promise<void> {
    // Idle timeout: reject if no SSE event arrives within 90 seconds.
    // The backend heartbeat fires every 15 s, so 90 s means 6 missed heartbeats.
    const IDLE_TIMEOUT_MS = 90_000;

    return new Promise<void>(async (resolve, reject) => {
      let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
      let idleTimer: ReturnType<typeof setTimeout> | null = null;

      const resetIdleTimer = () => {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          console.warn('[upload-api] SSE idle timeout — no data received for', IDLE_TIMEOUT_MS, 'ms');
          cleanup();
          reject(new Error('Upload timed out — no response from server'));
        }, IDLE_TIMEOUT_MS);
      };

      const cleanup = () => {
        if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
        if (reader) {
          reader.cancel().catch(() => {});
          reader = null;
        }
      };

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: buildFormData(request),
          signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: { message: 'Upload failed' } }));
          reject(new Error(err.error?.message ?? 'Upload request failed'));
          return;
        }

        reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let currentEvent = '';

        resetIdleTimer();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          resetIdleTimer();
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
                  cleanup();
                  resolve();
                  return;
                }
              } catch (e) {
                console.warn('[upload-api] Failed to parse SSE data for event', currentEvent, ':', line.slice(6, 200), e);
              }
            }
          }
        }

        // Stream ended without explicit done/error event — still resolve
        cleanup();
        resolve();
      } catch (err: any) {
        cleanup();
        if (err.name === 'AbortError') {
          resolve();
        } else {
          reject(err);
        }
      }
    });
  }
}

function buildFormData(request: UploadRequest): FormData {
  const formData = new FormData();
  for (const file of request.files) {
    formData.append('files', file);
  }
  formData.append('type', request.type);
  formData.append('title', request.title);
  formData.append('agentic', String(request.agentic));
  if (request.mainSubject) formData.append('mainSubject', request.mainSubject);
  if (request.subSubject) formData.append('subSubject', request.subSubject);
  if (request.classification) formData.append('classification', request.classification);
  if (request.subClassification) formData.append('subClassification', request.subClassification);
  if (request.difficulty) formData.append('difficulty', request.difficulty);
  return formData;
}
