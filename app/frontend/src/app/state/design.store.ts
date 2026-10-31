import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { DesignApi } from '../core/api/design.api';
import { DesignCategory, DesignDetail, DesignFilters, DesignListItem } from '../core/models/design.model';

const FILTERS_KEY = 'design.filters';
const EMPTY_FILTERS: DesignFilters = { q: '', categories: [], difficulties: [], seniority: null };

function loadFilters(): DesignFilters {
  try {
    const raw = localStorage.getItem(FILTERS_KEY);
    return raw ? { ...EMPTY_FILTERS, ...JSON.parse(raw) } : EMPTY_FILTERS;
  } catch {
    return EMPTY_FILTERS;
  }
}

interface DesignState {
  items: DesignListItem[];
  total: number;
  categories: DesignCategory[];
  filters: DesignFilters;
  status: 'idle' | 'loading' | 'error';
  error: string | null;
  detailCache: Record<string, DesignDetail>;
  detailError: string | null;
}

export const DesignStore = signalStore(
  { providedIn: 'root' },
  withState<DesignState>({
    items: [],
    total: 0,
    categories: [],
    filters: loadFilters(),
    status: 'idle',
    error: null,
    detailCache: {},
    detailError: null,
  }),
  withComputed((store) => ({
    hasActiveFilters: computed(() => {
      const f = store.filters();
      return !!f.q || f.categories.length > 0 || f.difficulties.length > 0 || !!f.seniority;
    }),
    /** Items grouped by category (in category display order), each group already sorted by difficulty. */
    groups: computed(() => {
      const items = store.items();
      const order = store.categories().map(c => c.id);
      const byCat = new Map<string, DesignListItem[]>();
      for (const item of items) {
        byCat.set(item.category, [...(byCat.get(item.category) ?? []), item]);
      }
      return [...byCat.entries()]
        .sort(([a], [b]) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99))
        .map(([id, list]) => ({ id, label: list[0].categoryLabel, items: list }));
    }),
  })),
  withMethods((store) => {
    const api = inject(DesignApi);

    const setFilters = (patch: Partial<DesignFilters>) => {
      const filters = { ...store.filters(), ...patch };
      localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
      patchState(store, { filters });
    };

    return {
      load() {
        patchState(store, { status: 'loading', error: null });
        const f = store.filters();
        api.query({ q: f.q.trim(), categories: f.categories, difficulties: f.difficulties, seniority: f.seniority, pageSize: 100 })
          .subscribe({
            next: ({ items, total }) => patchState(store, { items, total, status: 'idle' }),
            error: (err: any) => patchState(store, { status: 'error', error: err.message ?? 'Load failed' }),
          });
      },

      loadCategories() {
        if (store.categories().length) return;
        api.categories().subscribe({ next: categories => patchState(store, { categories }) });
      },

      setQuery(q: string) { setFilters({ q }); },
      setDifficulties(difficulties: string[]) { setFilters({ difficulties }); },
      setSeniority(seniority: string | null) { setFilters({ seniority }); },
      toggleCategory(id: string) {
        const current = store.filters().categories;
        setFilters({ categories: current.includes(id) ? current.filter(c => c !== id) : [...current, id] });
      },
      reset() { setFilters(EMPTY_FILTERS); },

      loadDetail(slug: string) {
        patchState(store, { detailError: null });
        if (store.detailCache()[slug]) return;
        api.getBySlug(slug).subscribe({
          next: detail => patchState(store, { detailCache: { ...store.detailCache(), [slug]: detail } }),
          error: (err: any) => patchState(store, {
            detailError: err.status === 404 ? 'Design problem not found' : (err.message ?? 'Load failed'),
          }),
        });
      },
    };
  }),
);
