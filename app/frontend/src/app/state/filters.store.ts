import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { FiltersApi } from '../core/api/filters.api';
import { CompanyOption, TopicOption, SelectedFilters } from '../core/models/filter.model';

interface FiltersState {
  companies: CompanyOption[];
  topics: TopicOption[];
  difficulties: string[];
  seniority: string[];
  selected: SelectedFilters;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

const initialSelected: SelectedFilters = {
  companies: [],
  difficulties: [],
  topics: [],
  seniority: null,
  q: '',
  matchMode: 'any',
  minInterviewValue: null,
};

function loadFromStorage(): Partial<SelectedFilters> {
  try {
    const raw = localStorage.getItem('filters.selected');
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export const FiltersStore = signalStore(
  { providedIn: 'root' },
  withState<FiltersState>({
    companies: [],
    topics: [],
    difficulties: [],
    seniority: [],
    selected: { ...initialSelected, ...loadFromStorage() },
    loading: false,
    error: null,
    loaded: false,
  }),
  withComputed((store) => ({
    selectedCompanyCount: computed(() => store.selected().companies.length),
    selectedTopicCount: computed(() => store.selected().topics.length),
    hasActiveFilters: computed(() => {
      const s = store.selected();
      return s.companies.length > 0 || s.difficulties.length > 0 ||
        s.topics.length > 0 || !!s.seniority || !!s.q || s.minInterviewValue !== null;
    }),
    queryParams: computed(() => {
      const s = store.selected();
      const params: Record<string, string> = {};
      if (s.companies.length) params['companies'] = s.companies.join(',');
      if (s.difficulties.length) params['difficulties'] = s.difficulties.join(',');
      if (s.topics.length) params['topics'] = s.topics.join(',');
      if (s.seniority) params['seniority'] = s.seniority;
      if (s.q) params['q'] = s.q;
      if (s.matchMode !== 'any') params['matchMode'] = s.matchMode;
      if (s.minInterviewValue !== null) params['minInterviewValue'] = String(s.minInterviewValue);
      return params;
    }),
  })),
  withMethods((store) => {
    const api = inject(FiltersApi);

    function persistSelected() {
      localStorage.setItem('filters.selected', JSON.stringify(store.selected()));
    }

    return {
      loadOptions() {
        if (store.loaded()) return;
        patchState(store, { loading: true, error: null });
        api.load().subscribe({
          next: (data) => {
            patchState(store, {
              companies: data.companies,
              topics: data.topics,
              difficulties: data.difficulties,
              seniority: data.seniority,
              loading: false,
              loaded: true,
            });
          },
          error: (err: any) => {
            patchState(store, { loading: false, error: err.message ?? 'Failed to load filters' });
          },
        });
      },

      toggleCompany(slug: string) {
        const current = store.selected().companies;
        const next = current.includes(slug)
          ? current.filter(c => c !== slug)
          : [...current, slug];
        patchState(store, { selected: { ...store.selected(), companies: next } });
        persistSelected();
      },

      setCompanies(slugs: string[]) {
        patchState(store, { selected: { ...store.selected(), companies: slugs } });
        persistSelected();
      },

      setDifficulties(values: string[]) {
        patchState(store, { selected: { ...store.selected(), difficulties: values } });
        persistSelected();
      },

      setTopics(ids: string[]) {
        patchState(store, { selected: { ...store.selected(), topics: ids } });
        persistSelected();
      },

      setSeniority(value: string | null) {
        patchState(store, { selected: { ...store.selected(), seniority: value } });
        persistSelected();
      },

      setQuery(q: string) {
        patchState(store, { selected: { ...store.selected(), q } });
        persistSelected();
      },

      setMatchMode(mode: 'any' | 'all') {
        patchState(store, { selected: { ...store.selected(), matchMode: mode } });
        persistSelected();
      },

      setMinInterviewValue(val: number | null) {
        patchState(store, { selected: { ...store.selected(), minInterviewValue: val } });
        persistSelected();
      },

      reset() {
        patchState(store, { selected: { ...initialSelected } });
        persistSelected();
      },

      applyFromAgent(filters: { companies?: string[]; difficulties?: string[]; topics?: string[]; seniority?: string | null }) {
        const current = store.selected();
        patchState(store, {
          selected: {
            ...current,
            companies: filters.companies ?? current.companies,
            difficulties: filters.difficulties ?? current.difficulties,
            topics: filters.topics ?? current.topics,
            seniority: filters.seniority ?? current.seniority,
          },
        });
        persistSelected();
      },
    };
  }),
);
