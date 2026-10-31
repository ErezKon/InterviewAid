import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DesignCategory, DesignDetail, DesignListItem } from '../models/design.model';

function toParams(filters: Record<string, any>): HttpParams {
  let params = new HttpParams();
  for (const [key, val] of Object.entries(filters)) {
    if (val != null && val !== '' && !(Array.isArray(val) && val.length === 0)) {
      params = params.set(key, Array.isArray(val) ? val.join(',') : String(val));
    }
  }
  return params;
}

@Injectable({ providedIn: 'root' })
export class DesignApi {
  private http = inject(HttpClient);

  query(filters: Record<string, any>): Observable<{ items: DesignListItem[]; total: number }> {
    return this.http.get<{ data: DesignListItem[]; meta: { total: number } }>('/api/design', { params: toParams(filters) })
      .pipe(map(r => ({ items: r.data, total: r.meta.total })));
  }

  categories(): Observable<DesignCategory[]> {
    return this.http.get<{ data: DesignCategory[] }>('/api/design/categories').pipe(map(r => r.data));
  }

  getBySlug(slug: string): Observable<DesignDetail> {
    return this.http.get<{ data: DesignDetail }>(`/api/design/${slug}`).pipe(map(r => r.data));
  }

  getRandom(filters: Record<string, any>): Observable<DesignListItem> {
    return this.http.get<{ data: DesignListItem }>('/api/design/random', { params: toParams(filters) })
      .pipe(map(r => r.data));
  }
}
