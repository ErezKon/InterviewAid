import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { ModelsApi } from '../core/api/models.api';
import { ModelInfo } from '../core/models/chat.model';

interface ModelsState {
  models: ModelInfo[];
  defaultModelId: string;
  selectedModelId: string;
  loaded: boolean;
}

export const ModelsStore = signalStore(
  { providedIn: 'root' },
  withState<ModelsState>({
    models: [],
    defaultModelId: 'gpt-oss-120b',
    selectedModelId: localStorage.getItem('selectedModelId') ?? 'gpt-oss-120b',
    loaded: false,
  }),
  withMethods((store) => {
    const api = inject(ModelsApi);
    return {
      load() {
        if (store.loaded()) return;
        api.load().subscribe({
          next: ({ models, defaultModelId }) => {
            patchState(store, { models, defaultModelId, loaded: true });
          },
        });
      },
      selectModel(id: string) {
        patchState(store, { selectedModelId: id });
        localStorage.setItem('selectedModelId', id);
      },
    };
  }),
);
