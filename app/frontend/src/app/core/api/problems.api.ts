import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProblemListItem, ProblemDetail, ProblemSolution } from '../models/problem.model';

interface PaginatedResponse<T> {
  data: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number; appliedFilters?: any };
}

@Injectable({ providedIn: 'root' })
export class ProblemsApi {
  private http = inject(HttpClient);

  query(filters: Record<string, any>): Observable<{ items: ProblemListItem[]; meta: any }> {
    let params = new HttpParams();
    for (const [key, val] of Object.entries(filters)) {
      if (val != null && val !== '' && !(Array.isArray(val) && val.length === 0)) {
        params = params.set(key, Array.isArray(val) ? val.join(',') : String(val));
      }
    }
    return this.http.get<PaginatedResponse<ProblemListItem>>('/api/problems', { params })
      .pipe(map(r => ({ items: r.data, meta: r.meta })));
  }

  getBySlug(slug: string): Observable<ProblemDetail> {
    return this.http.get<{ data: ProblemDetail }>(`/api/problems/${slug}`)
      .pipe(map(r => r.data));
  }

  getSolution(slug: string): Observable<ProblemSolution> {
    return this.http.get<{ data: ProblemSolution }>(`/api/problems/${slug}/solution`)
      .pipe(map(r => r.data));
  }

  getRandom(filters: Record<string, any>): Observable<ProblemListItem> {
    let params = new HttpParams();
    for (const [key, val] of Object.entries(filters)) {
      if (val != null && val !== '' && !(Array.isArray(val) && val.length === 0)) {
        params = params.set(key, Array.isArray(val) ? val.join(',') : String(val));
      }
    }
    return this.http.get<{ data: ProblemListItem }>('/api/problems/random', { params })
      .pipe(map(r => r.data));
  }
}
