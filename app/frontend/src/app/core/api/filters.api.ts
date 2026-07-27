import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FiltersData } from '../models/filter.model';

@Injectable({ providedIn: 'root' })
export class FiltersApi {
  private http = inject(HttpClient);

  load(): Observable<FiltersData> {
    return this.http.get<{ data: FiltersData }>('/api/filters').pipe(map(r => r.data));
  }
}
