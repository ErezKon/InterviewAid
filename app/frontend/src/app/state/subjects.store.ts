import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { SubjectsApi } from '../core/api/subjects.api';
import { SubjectListItem, SubjectDetail } from '../core/models/subject.model';

interface SubjectsState {
  items: SubjectListItem[];
  total: number;
  page: number;
  pageSize: number;
  status: 'idle' | 'loading' | 'error';
  error: string | null;
  currentDetail: SubjectDetail | null;
}

export const SubjectsStore = signalStore(
  { providedIn: 'root' },
  withState<SubjectsState>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 25,
    status: 'idle',
    error: null,
    currentDetail: null,
  }),
  withMethods((store) => {
    const api = inject(SubjectsApi);
    return {
      load(filters: Record<string, any> = {}) {
        patchState(store, { status: 'loading', error: null });
        api.query({ ...filters, page: store.page(), pageSize: store.pageSize() }).subscribe({
          next: ({ items, meta }) => {
            patchState(store, { items, total: meta.total, status: 'idle' });
          },
          error: (err: any) => {
            patchState(store, { status: 'error', error: err.message ?? 'Load failed' });
          },
        });
      },
      loadDetail(id: string) {
        patchState(store, { status: 'loading', currentDetail: null });
        api.getById(id).subscribe({
          next: (detail) => patchState(store, { currentDetail: detail, status: 'idle' }),
          error: (err: any) => patchState(store, { status: 'error', error: err.message }),
        });
      },
      setPage(page: number) { patchState(store, { page }); },
    };
  }),
);
