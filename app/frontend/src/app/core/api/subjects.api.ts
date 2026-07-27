import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubjectListItem, SubjectDetail } from '../models/subject.model';

@Injectable({ providedIn: 'root' })
export class SubjectsApi {
  private http = inject(HttpClient);

  query(filters: Record<string, any>): Observable<{ items: SubjectListItem[]; meta: any }> {
    let params = new HttpParams();
    for (const [key, val] of Object.entries(filters)) {
      if (val != null && val !== '' && !(Array.isArray(val) && val.length === 0)) {
        params = params.set(key, Array.isArray(val) ? val.join(',') : String(val));
      }
    }
    return this.http.get<{ data: SubjectListItem[]; meta: any }>('/api/subjects', { params })
      .pipe(map(r => ({ items: r.data, meta: r.meta })));
  }

  getById(id: string): Observable<SubjectDetail> {
    return this.http.get<{ data: SubjectDetail }>(`/api/subjects/${id}`)
      .pipe(map(r => r.data));
  }
}
