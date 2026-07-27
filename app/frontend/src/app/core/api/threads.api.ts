import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatThread, ChatMessage } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ThreadsApi {
  private http = inject(HttpClient);

  list(): Observable<ChatThread[]> {
    return this.http.get<{ data: ChatThread[] }>('/api/threads').pipe(map(r => r.data));
  }

  get(id: string): Observable<ChatThread & { messages: ChatMessage[] }> {
    return this.http.get<{ data: ChatThread & { messages: ChatMessage[] } }>(`/api/threads/${id}`)
      .pipe(map(r => r.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<any>(`/api/threads/${id}`).pipe(map(() => void 0));
  }

  updateTitle(id: string, title: string): Observable<void> {
    return this.http.post<any>(`/api/threads/${id}/title`, { title }).pipe(map(() => void 0));
  }
}
