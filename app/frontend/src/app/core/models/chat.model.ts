export interface ChatThread {
  id: string;
  title: string | null;
  mode: string;
  modelId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  payloadJson: string | null;
  createdAt: string;
  structured?: any;
  streaming?: boolean;
}

export interface ModelInfo {
  id: string;
  label: string;
  provider: string;
  supportsTools: boolean;
  supportsStructuredOutput: boolean;
}

export type ChatMode = 'auto' | 'find-problems' | 'mock-interview' | 'subject-quiz' | 'content-enricher';

export interface SseEvent {
  event: string;
  data: any;
}
