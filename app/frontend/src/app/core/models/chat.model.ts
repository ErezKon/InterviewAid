export interface ChatThread {
  id: string;
  title: string | null;
  mode: string;
  modelId: string;
  createdAt: string;
  updatedAt: string;
}

export type ChatComponentName =
  | 'text'
  | 'chat-markdown-viewer'
  | 'chat-quiz-cards'
  | 'chat-problem-list'
  | 'chat-hint-card'
  | 'chat-interview-question'
  | 'chat-evaluation-scorecard'
  | 'chat-enrichment-report';

export interface ChatUiEnvelope {
  component: ChatComponentName;
  message: string;
  inputs: Record<string, any>;
  followUpSuggestions: string[];
}

export interface ChatMessage {
  id: string;
  threadId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  payloadJson: string | null;
  createdAt: string;
  ui?: ChatUiEnvelope;
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
