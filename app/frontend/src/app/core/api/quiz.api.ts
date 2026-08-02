import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuizQuestion, QuizStatsGroup } from '../models/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizApi {
  private http = inject(HttpClient);

  getStats(): Observable<QuizStatsGroup[]> {
    return this.http.get<{ data: QuizStatsGroup[] }>('/api/quiz/stats')
      .pipe(map(r => r.data));
  }

  getQuestions(subjectIds: string[], limit?: number, shuffle = true): Observable<QuizQuestion[]> {
    let params = new HttpParams()
      .set('subjects', subjectIds.join(','))
      .set('shuffle', String(shuffle));
    if (limit) {
      params = params.set('limit', String(limit));
    }
    return this.http.get<{ data: QuizQuestion[] }>('/api/quiz', { params })
      .pipe(map(r => r.data));
  }

  regenerate(subjectId: string, modelId?: string): Observable<QuizQuestion[]> {
    return this.http.post<{ data: QuizQuestion[] }>(
      `/api/quiz/regenerate/${subjectId}`,
      modelId ? { modelId } : {},
    ).pipe(map(r => r.data));
  }
}
