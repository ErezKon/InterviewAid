import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { ProblemsApi } from '../core/api/problems.api';
import { ProblemListItem, ProblemDetail } from '../core/models/problem.model';

interface ProblemsState {
  items: ProblemListItem[];
  total: number;
  page: number;
  pageSize: number;
  sort: string;
  order: 'asc' | 'desc';
  status: 'idle' | 'loading' | 'error';
  error: string | null;
  detailCache: Record<string, ProblemDetail>;
}

export const ProblemsStore = signalStore(
  { providedIn: 'root' },
  withState<ProblemsState>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 25,
    sort: 'interviewValue',
    order: 'desc',
    status: 'idle',
    error: null,
    detailCache: {},
  }),
  withComputed((store) => ({
    hasResults: computed(() => store.items().length > 0),
    totalPages: computed(() => Math.ceil(store.total() / store.pageSize())),
    emptyBecauseTooNarrow: computed(() => store.status() !== 'loading' && store.total() === 0),
  })),
  withMethods((store) => {
    const api = inject(ProblemsApi);

    return {
      load(filters: Record<string, any>) {
        patchState(store, { status: 'loading', error: null });
        const params = {
          ...filters,
          page: store.page(),
          pageSize: store.pageSize(),
          sort: store.sort(),
          order: store.order(),
        };
        api.query(params).subscribe({
          next: ({ items, meta }) => {
            patchState(store, { items, total: meta.total, status: 'idle' });
          },
          error: (err: any) => {
            patchState(store, { status: 'error', error: err.message ?? 'Load failed' });
          },
        });
      },

      setPage(page: number) {
        patchState(store, { page });
      },

      setPageSize(size: number) {
        patchState(store, { page: 1, pageSize: size });
      },

      setSort(sort: string, order: 'asc' | 'desc') {
        patchState(store, { sort, order, page: 1 });
      },

      loadDetail(slug: string) {
        if (store.detailCache()[slug]) return;
        api.getBySlug(slug).subscribe({
          next: (detail) => {
            patchState(store, {
              detailCache: { ...store.detailCache(), [slug]: detail },
            });
          },
        });
      },

      getCachedDetail(slug: string): ProblemDetail | undefined {
        return store.detailCache()[slug];
      },
    };
  }),
);
