import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { ChatApi, ChatRequest } from '../core/api/chat.api';
import { ThreadsApi } from '../core/api/threads.api';
import { ChatThread, ChatMessage, ChatMode, ChatUiEnvelope } from '../core/models/chat.model';

interface ChatState {
  threads: ChatThread[];
  activeThreadId: string | null;
  messages: ChatMessage[];
  mode: ChatMode;
  streaming: boolean;
  currentSteps: string[];
  error: string | null;
}

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState<ChatState>({
    threads: [],
    activeThreadId: null,
    messages: [],
    mode: 'auto',
    streaming: false,
    currentSteps: [],
    error: null,
  }),
  withMethods((store) => {
    const chatApi = inject(ChatApi);
    const threadsApi = inject(ThreadsApi);
    let abortController: AbortController | null = null;

    return {
      loadThreads() {
        threadsApi.list().subscribe({
          next: (threads) => patchState(store, { threads }),
        });
      },

      loadThread(threadId: string) {
        patchState(store, { activeThreadId: threadId, messages: [] });
        threadsApi.get(threadId).subscribe({
          next: (data) => {
            const messages = data.messages.map(m => {
              if (m.role === 'assistant' && m.payloadJson) {
                try { return { ...m, ui: JSON.parse(m.payloadJson) as ChatUiEnvelope }; } catch { /* skip */ }
              }
              return m;
            });
            patchState(store, { messages, activeThreadId: threadId });
          },
        });
      },

      setMode(mode: ChatMode) {
        patchState(store, { mode });
      },

      newThread() {
        patchState(store, { activeThreadId: null, messages: [], error: null });
      },

      deleteThread(id: string) {
        threadsApi.delete(id).subscribe({
          next: () => {
            patchState(store, {
              threads: store.threads().filter(t => t.id !== id),
              ...(store.activeThreadId() === id ? { activeThreadId: null, messages: [] } : {}),
            });
          },
        });
      },

      async send(text: string, modelId: string, context?: ChatRequest['context']) {
        const userMsg: ChatMessage = {
          id: 'temp-' + Date.now(),
          threadId: store.activeThreadId() ?? '',
          role: 'user',
          content: text,
          payloadJson: null,
          createdAt: new Date().toISOString(),
        };

        const assistantMsg: ChatMessage = {
          id: 'temp-assistant-' + Date.now(),
          threadId: store.activeThreadId() ?? '',
          role: 'assistant',
          content: '',
          payloadJson: null,
          createdAt: new Date().toISOString(),
          streaming: true,
        };

        patchState(store, {
          messages: [...store.messages(), userMsg, assistantMsg],
          streaming: true,
          error: null,
          currentSteps: [],
        });

        abortController = new AbortController();

        try {
          await chatApi.sendStream(
            {
              message: text,
              modelId,
              threadId: store.activeThreadId() ?? undefined,
              mode: store.mode(),
              stream: true,
              context,
            },
            (event, data) => {
              const msgs = [...store.messages()];
              const lastIdx = msgs.length - 1;

              switch (event) {
                case 'meta':
                  if (!store.activeThreadId() && data.threadId) {
                    patchState(store, { activeThreadId: data.threadId });
                  }
                  break;
                case 'step':
                  patchState(store, { currentSteps: [...store.currentSteps(), ...data.nodes] });
                  break;
                case 'token':
                  // Server sends full content (not deltas) — replace, don't append
                  msgs[lastIdx] = { ...msgs[lastIdx], content: data.delta };
                  patchState(store, { messages: msgs });
                  break;
                case 'tool':
                  break;
                case 'result': {
                  msgs[lastIdx] = {
                    ...msgs[lastIdx],
                    ui: data.ui as ChatUiEnvelope,
                    content: data.ui?.message ?? msgs[lastIdx].content,
                    streaming: false,
                  };
                  patchState(store, { messages: msgs, streaming: false });
                  break;
                }
                case 'error':
                  patchState(store, { error: data.message, streaming: false });
                  break;
                case 'done': {
                  const msg = msgs[lastIdx];
                  if (!msg.ui) {
                    msgs[lastIdx] = {
                      ...msg,
                      ui: { component: 'text', message: msg.content, inputs: {}, followUpSuggestions: [] },
                      streaming: false,
                    };
                  } else {
                    msgs[lastIdx] = { ...msg, streaming: false };
                  }
                  patchState(store, { messages: msgs, streaming: false });
                  break;
                }
              }
            },
            abortController.signal,
          );
        } catch (err: any) {
          patchState(store, { error: err.message, streaming: false });
        }

        this.loadThreads();
      },

      abort() {
        abortController?.abort();
        patchState(store, { streaming: false });
      },
    };
  }),
);
