import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelInfo } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ModelsApi {
  private http = inject(HttpClient);

  load(): Observable<{ models: ModelInfo[]; defaultModelId: string }> {
    return this.http.get<{ data: ModelInfo[]; meta: { defaultModelId: string } }>('/api/models')
      .pipe(map(r => ({ models: r.data, defaultModelId: r.meta.defaultModelId })));
  }
}
