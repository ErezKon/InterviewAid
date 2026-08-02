import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { ChatApi, ChatRequest } from '../core/api/chat.api';
import { ThreadsApi } from '../core/api/threads.api';
import { ChatThread, ChatMessage, ChatMode } from '../core/models/chat.model';

/** Try to extract a JSON object from fenced or bare JSON in text content. */
function extractJsonFromContent(text: string): any | null {
  // Try fenced JSON first (```json ... ``` or ``` ... ```)
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    try { return JSON.parse(fenceMatch[1].trim()); } catch { /* fall through */ }
  }
  // Try bare JSON object
  const braceStart = text.indexOf('{');
  if (braceStart >= 0) {
    try { return JSON.parse(text.slice(braceStart).trim()); } catch { /* fall through */ }
  }
  return null;
}

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
              if (m.payloadJson && !m.structured) {
                try { return { ...m, structured: JSON.parse(m.payloadJson) }; } catch { /* skip */ }
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
                  // Handle structured as object or JSON string
                  let structured = data.structured;
                  if (typeof structured === 'string') {
                    try { structured = JSON.parse(structured); } catch { /* keep as string */ }
                  }
                  msgs[lastIdx] = {
                    ...msgs[lastIdx],
                    structured,
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
                  // Safety net: extract structured from content if result event didn't set it
                  if (!msg.structured && msg.content) {
                    const extracted = extractJsonFromContent(msg.content);
                    if (extracted && typeof extracted === 'object') {
                      msgs[lastIdx] = { ...msg, structured: extracted, streaming: false };
                    } else {
                      msgs[lastIdx] = { ...msg, streaming: false };
                    }
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
