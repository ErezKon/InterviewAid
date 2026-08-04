import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { UploadApi, UploadResult } from '../core/api/upload.api';

export interface UploadProgressEvent {
  event: string;
  data: any;
}

interface UploadState {
  files: File[];
  type: 'material' | 'problem';
  title: string;
  agentic: boolean;
  mainSubject: string;
  subSubject: string;
  classification: string;
  subClassification: string;
  difficulty: string;
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: UploadProgressEvent[];
  result: UploadResult | null;
  error: string | null;
}

export const UploadStore = signalStore(
  { providedIn: 'root' },
  withState<UploadState>({
    files: [],
    type: 'material',
    title: '',
    agentic: false,
    mainSubject: '',
    subSubject: '',
    classification: '',
    subClassification: '',
    difficulty: '',
    status: 'idle',
    progress: [],
    result: null,
    error: null,
  }),
  withMethods((store) => {
    const api = inject(UploadApi);
    let abortController: AbortController | null = null;

    return {
      setFiles(files: File[]) { patchState(store, { files }); },
      setType(type: 'material' | 'problem') { patchState(store, { type }); },
      setTitle(title: string) { patchState(store, { title }); },
      setAgentic(agentic: boolean) { patchState(store, { agentic }); },
      setMainSubject(v: string) { patchState(store, { mainSubject: v }); },
      setSubSubject(v: string) { patchState(store, { subSubject: v }); },
      setClassification(v: string) { patchState(store, { classification: v }); },
      setSubClassification(v: string) { patchState(store, { subClassification: v }); },
      setDifficulty(v: string) { patchState(store, { difficulty: v }); },

      submit() {
        patchState(store, { status: 'uploading', progress: [], result: null, error: null });

        const request = {
          files: store.files(),
          type: store.type(),
          title: store.title(),
          agentic: store.agentic(),
          mainSubject: store.mainSubject() || undefined,
          subSubject: store.subSubject() || undefined,
          classification: store.classification() || undefined,
          subClassification: store.subClassification() || undefined,
          difficulty: store.difficulty() || undefined,
        };

        if (request.agentic) {
          abortController = new AbortController();
          api.sendStream(
            request,
            (event, data) => {
              if (event === 'result') {
                patchState(store, { result: data as UploadResult, status: 'success' });
              } else if (event === 'done') {
                // Fallback: if the result event was missed, transition to success
                if (store.status() === 'uploading') {
                  patchState(store, { status: 'success' });
                }
              } else if (event === 'error') {
                patchState(store, { status: 'error', error: data?.message ?? 'Upload failed' });
              } else if (event === 'status' && data?.phase === 'complete') {
                // The backend signals all work is done — record this as a
                // progress event AND use it as a fallback transition cue.
                // The real transition comes from the 'result' event right
                // after, but if that event is lost we fall through to 'done'
                // or the promise .then() handler.
                patchState(store, { progress: [...store.progress(), { event, data }] });
              } else {
                patchState(store, { progress: [...store.progress(), { event, data }] });
              }
            },
            abortController.signal,
          ).then(() => {
            // Safety net: if stream ended without result or done events
            if (store.status() === 'uploading') {
              patchState(store, { status: 'success' });
            }
          }).catch((err) => {
            if (store.status() === 'uploading') {
              patchState(store, { status: 'error', error: err.message ?? 'Upload failed' });
            }
          });
        } else {
          api.upload(request).subscribe({
            next: (result) => patchState(store, { result, status: 'success' }),
            error: (err: any) => patchState(store, { status: 'error', error: err.message ?? 'Upload failed' }),
          });
        }
      },

      cancel() {
        abortController?.abort();
        abortController = null;
        patchState(store, { status: 'idle' });
      },

      reset() {
        abortController?.abort();
        abortController = null;
        patchState(store, {
          files: [], title: '', agentic: false,
          mainSubject: '', subSubject: '',
          classification: '', subClassification: '',
          difficulty: '', status: 'idle',
          progress: [], result: null, error: null,
        });
      },
    };
  }),
);
